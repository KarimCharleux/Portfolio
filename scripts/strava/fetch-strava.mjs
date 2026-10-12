// Builds the Sport app snapshot.
//   node scripts/strava/fetch-strava.mjs --input <activities.json> [--today YYYY-MM-DD] [--skip-if-unchanged]
//   node scripts/strava/fetch-strava.mjs            (fetches from Strava; needs STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN)
// Writes src/app/content/sport-stats.json, public/sport/routes.json and
// public/sport/territory.json, or nothing on error.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutes, buildStats, buildTerritory } from './transform.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const STATS_PATH = resolve(ROOT, 'src/app/content/sport-stats.json');
const ROUTES_PATH = resolve(ROOT, 'public/sport/routes.json');
const TERRITORY_PATH = resolve(ROOT, 'public/sport/territory.json');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}.`);
  return value;
}

async function stravaJson(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(
      `Strava ${init?.method ?? 'GET'} ${new URL(url).pathname} -> ${res.status} ${await res.text()}`,
    );
  }
  return res.json();
}

async function fetchFromStrava() {
  const token = await stravaJson('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: requireEnv('STRAVA_CLIENT_ID'),
      client_secret: requireEnv('STRAVA_CLIENT_SECRET'),
      grant_type: 'refresh_token',
      refresh_token: requireEnv('STRAVA_REFRESH_TOKEN'),
    }),
  });
  if (token.refresh_token && token.refresh_token !== process.env.STRAVA_REFRESH_TOKEN) {
    // Strava invalidates the old refresh token once a new one is returned, so the next run
    // fails until the secret is updated: see authorize.mjs.
    console.warn('Strava returned a new refresh token: update the STRAVA_REFRESH_TOKEN secret.');
  }

  const activities = [];
  for (let page = 1; page <= 50; page++) {
    const batch = await stravaJson(
      `https://www.strava.com/api/v3/athlete/activities?per_page=200&page=${page}`,
      { headers: { Authorization: `Bearer ${token.access_token}` } },
    );
    if (!Array.isArray(batch))
      throw new Error('Unexpected Strava response: activities is not an array.');
    if (batch.length === 0) break;
    activities.push(...batch);
  }
  return activities;
}

async function loadActivities() {
  const input = arg('--input');
  if (input) return JSON.parse(readFileSync(input, 'utf8'));
  return fetchFromStrava();
}

/**
 * Bump when transform.mjs changes what it derives from the same activities (e.g. a filter rule),
 * so the next sync rebuilds the snapshot even if no activity changed.
 */
const PIPELINE_VERSION = 3;

/** Hash of the per-activity fields the pipeline uses, so unrelated Strava changes do not trigger a commit. */
function sourceHash(raw) {
  const stable = raw
    .map((a) => [
      a.id,
      a.sport_type,
      a.start_date_local,
      a.distance,
      a.moving_time,
      a.total_elevation_gain,
      a.map?.summary_polyline ?? null,
      a.visibility ?? null,
      a.private ?? null,
      a.trainer ?? null,
    ])
    .sort((x, y) => (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0));
  return createHash('sha256')
    .update(JSON.stringify([PIPELINE_VERSION, stable]))
    .digest('hex');
}

function previousHash() {
  if (!existsSync(STATS_PATH)) return null;
  try {
    return JSON.parse(readFileSync(STATS_PATH, 'utf8')).sourceHash ?? null;
  } catch {
    return null;
  }
}

async function main() {
  const today = arg('--today') ?? new Date().toISOString().slice(0, 10);
  const raw = await loadActivities();
  // Build everything before writing anything, so a failure never leaves a half-updated snapshot.
  const hash = sourceHash(raw);
  if (
    process.argv.includes('--skip-if-unchanged') &&
    previousHash() === hash &&
    existsSync(TERRITORY_PATH)
  ) {
    console.log('No new activity: snapshot unchanged.');
    return;
  }
  const stats = { ...buildStats(raw, today), sourceHash: hash };
  const routes = buildRoutes(raw);
  const territory = buildTerritory(raw);
  mkdirSync(dirname(ROUTES_PATH), { recursive: true });
  writeFileSync(STATS_PATH, JSON.stringify(stats));
  writeFileSync(ROUTES_PATH, JSON.stringify(routes));
  writeFileSync(TERRITORY_PATH, JSON.stringify(territory));
  console.log(
    `Snapshot: ${stats.totals.all.activities} activities, ${routes.length} routes, ` +
      `${territory.cells.length} territory cells ` +
      `(${stats.firstActivity} -> ${today}).`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
