// Builds the Sport app snapshot.
//   node scripts/strava/fetch-strava.mjs --input <activities.json> [--today YYYY-MM-DD]
//   node scripts/strava/fetch-strava.mjs            (fetches from Strava, see Task 2)
// Writes src/app/content/sport-stats.json and public/sport/routes.json, or nothing on error.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutes, buildStats } from './transform.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const STATS_PATH = resolve(ROOT, 'src/app/content/sport-stats.json');
const ROUTES_PATH = resolve(ROOT, 'public/sport/routes.json');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

async function loadActivities() {
  const input = arg('--input');
  if (input) return JSON.parse(readFileSync(input, 'utf8'));
  throw new Error('Live Strava fetch not implemented yet: pass --input <file>.');
}

async function main() {
  const today = arg('--today') ?? new Date().toISOString().slice(0, 10);
  const raw = await loadActivities();
  // Build both before writing either, so a failure never leaves a half-updated snapshot.
  const stats = buildStats(raw, today);
  const routes = buildRoutes(raw);
  mkdirSync(dirname(ROUTES_PATH), { recursive: true });
  writeFileSync(STATS_PATH, JSON.stringify(stats));
  writeFileSync(ROUTES_PATH, JSON.stringify(routes));
  console.log(
    `Snapshot: ${stats.totals.all.activities} activities, ${routes.length} routes, ` +
      `${stats.weeks.length} weeks (${stats.firstActivity} -> ${today}).`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
