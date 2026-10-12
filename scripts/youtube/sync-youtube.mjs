// Builds the Videos app snapshot from the channel's long-form uploads.
//   node scripts/youtube/sync-youtube.mjs [--force]
// Needs yt-dlp and ffmpeg on PATH. Writes public/videos/<id>.mp4|jpg and
// src/app/content/youtube-videos.json, or nothing on error. Run by hand: YouTube often blocks
// yt-dlp from CI datacenter IPs, so there is no scheduled workflow.

import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const CLIPS_CONFIG_PATH = resolve(ROOT, 'scripts/youtube/clips.json');
const SNAPSHOT_PATH = resolve(ROOT, 'src/app/content/youtube-videos.json');
const MEDIA_DIR = resolve(ROOT, 'public/videos');

/** `UULF` + channel id suffix: YouTube's long-form uploads playlist (no Shorts, no lives). */
const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?playlist_id=UULFhOmB4si9hFtoaDDrUNW8RQ';
const VIDEO_COUNT = 6;
const CLIP_SECONDS = 6;
const DEFAULT_START_RATIO = 0.35;

const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

function requireTool(name, versionFlag) {
  try {
    execFileSync(name, [versionFlag], { stdio: 'ignore' });
  } catch {
    throw new Error(`${name} not found on PATH (brew install ${name}).`);
  }
}

function decodeXml(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, '&');
}

/** Parses the small, stable Atom feed with regexes: no XML dependency. */
export function parseFeed(xml) {
  return xml
    .split('<entry>')
    .slice(1)
    .map((entry) => {
      const pick = (re) => entry.match(re)?.[1];
      const id = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const title = pick(/<title>([^<]*)<\/title>/);
      const published = pick(/<published>([^<]+)<\/published>/);
      const views = pick(/<media:statistics views="(\d+)"/);
      if (!id || title === undefined || !published) {
        throw new Error('Unexpected feed entry: missing videoId, title or published.');
      }
      return {
        id,
        title: decodeXml(title).trim(),
        publishedAt: published.slice(0, 10),
        views: Number(views ?? 0),
      };
    });
}

/** `"1:12"`, `"1:02:03"` or a number of seconds -> seconds. */
export function parseTimecode(value, id) {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return Math.floor(value);
  if (typeof value === 'string' && /^\d+(:[0-5]\d){0,2}$/.test(value)) {
    return value.split(':').reduce((total, part) => total * 60 + Number(part), 0);
  }
  throw new Error(`clips.json: invalid timecode ${JSON.stringify(value)} for ${id} (use "m:ss").`);
}

export function clipStartFor(id, duration, config) {
  const wanted =
    id in config ? parseTimecode(config[id], id) : Math.floor(duration * DEFAULT_START_RATIO);
  return Math.max(0, Math.min(wanted, duration - CLIP_SECONDS));
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function duration(id) {
  const out = execFileSync('yt-dlp', ['--print', 'duration', watchUrl(id)], { encoding: 'utf8' });
  const seconds = Number(out.trim());
  if (!Number.isFinite(seconds) || seconds < CLIP_SECONDS) {
    throw new Error(`yt-dlp: unusable duration "${out.trim()}" for ${id}.`);
  }
  return Math.floor(seconds);
}

function cutClip(id, start, workDir, outPath) {
  execFileSync(
    'yt-dlp',
    [
      '--quiet',
      '-f',
      'bv*[height<=1080][ext=mp4]/bv*[height<=1080]',
      '--download-sections',
      `*${start}-${start + CLIP_SECONDS}`,
      '--force-keyframes-at-cuts',
      '-o',
      join(workDir, `${id}.%(ext)s`),
      watchUrl(id),
    ],
    { stdio: 'inherit' },
  );
  const source = readdirSync(workDir).find((name) => name.startsWith(`${id}.`));
  if (!source) throw new Error(`yt-dlp produced no file for ${id}.`);
  execFileSync(
    'ffmpeg',
    [
      '-loglevel',
      'error',
      '-y',
      '-i',
      join(workDir, source),
      '-t',
      String(CLIP_SECONDS),
      '-an',
      '-vf',
      'scale=960:-2,fps=24',
      '-c:v',
      'libx264',
      '-crf',
      '32',
      '-preset',
      'veryslow',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      outPath,
    ],
    { stdio: 'inherit' },
  );
}

/** Downloads the YouTube thumbnail, then re-encodes it smaller (960px wide) into `outPath`. */
async function downloadPoster(id, workDir, outPath) {
  for (const quality of ['maxresdefault', 'hqdefault']) {
    const res = await fetch(`https://i.ytimg.com/vi/${id}/${quality}.jpg`);
    if (res.ok) {
      const rawPath = join(workDir, `${id}-poster.jpg`);
      writeFileSync(rawPath, Buffer.from(await res.arrayBuffer()));
      execFileSync(
        'ffmpeg',
        ['-loglevel', 'error', '-y', '-i', rawPath, '-vf', 'scale=960:-2', '-q:v', '5', outPath],
        { stdio: 'inherit' },
      );
      return;
    }
  }
  throw new Error(`No thumbnail found for ${id}.`);
}

async function main() {
  requireTool('yt-dlp', '--version');
  requireTool('ffmpeg', '-version');
  const force = process.argv.includes('--force');

  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`Feed -> ${res.status}`);
  const entries = parseFeed(await res.text()).slice(0, VIDEO_COUNT);
  if (entries.length === 0) throw new Error('Feed returned no videos.');

  const config = readJson(CLIPS_CONFIG_PATH, {});
  const previous = new Map(readJson(SNAPSHOT_PATH, { videos: [] }).videos.map((v) => [v.id, v]));

  // Build everything in a temp dir first, so a failure never leaves a half-updated snapshot.
  const workDir = mkdtempSync(join(tmpdir(), 'portfolio-youtube-'));
  const stagedDir = join(workDir, 'out');
  mkdirSync(stagedDir);
  try {
    const videos = [];
    for (const entry of entries) {
      const seconds = duration(entry.id);
      const clipStart = clipStartFor(entry.id, seconds, config);
      const clipPath = join(MEDIA_DIR, `${entry.id}.mp4`);
      const unchanged =
        !force && existsSync(clipPath) && previous.get(entry.id)?.clipStart === clipStart;
      if (unchanged) {
        console.log(`= ${entry.id} clip unchanged (start ${clipStart}s)`);
      } else {
        console.log(`> ${entry.id} cutting ${clipStart}s-${clipStart + CLIP_SECONDS}s`);
        const rawDir = join(workDir, entry.id);
        mkdirSync(rawDir);
        cutClip(entry.id, clipStart, rawDir, join(stagedDir, `${entry.id}.mp4`));
      }
      await downloadPoster(entry.id, workDir, join(stagedDir, `${entry.id}.jpg`));
      videos.push({ ...entry, duration: seconds, clipStart });
    }

    mkdirSync(MEDIA_DIR, { recursive: true });
    for (const name of readdirSync(stagedDir)) {
      copyFileSync(join(stagedDir, name), join(MEDIA_DIR, name));
    }
    const keep = new Set(videos.map((v) => v.id));
    for (const name of readdirSync(MEDIA_DIR)) {
      if (!/\.(mp4|jpg)$/.test(name)) continue;
      const id = name.replace(/\.(mp4|jpg)$/, '');
      if (!keep.has(id)) rmSync(join(MEDIA_DIR, name));
    }
    const snapshot = { syncedAt: new Date().toISOString().slice(0, 10), videos };
    writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
    console.log(`Snapshot: ${videos.length} videos.`);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

// Only run when executed directly, so the pure helpers can be imported for quick checks.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
