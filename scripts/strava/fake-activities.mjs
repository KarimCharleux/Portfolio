// Deterministic fake Strava activities in the API's summary shape. Used only to produce the
// committed fixture before real credentials exist. Usage:
//   node scripts/strava/fake-activities.mjs <out.json> [--today YYYY-MM-DD]

import { writeFileSync } from 'node:fs';

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function encodePolyline(points) {
  let out = '';
  let prevLat = 0;
  let prevLng = 0;
  const encode = (value) => {
    let v = value < 0 ? ~(value << 1) : value << 1;
    let s = '';
    while (v >= 0x20) {
      s += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
      v >>= 5;
    }
    return s + String.fromCharCode(v + 63);
  };
  for (const [lat, lng] of points) {
    const ilat = Math.round(lat * 1e5);
    const ilng = Math.round(lng * 1e5);
    out += encode(ilat - prevLat) + encode(ilng - prevLng);
    prevLat = ilat;
    prevLng = ilng;
  }
  return out;
}

const PROFILES = [
  // sport_type, weekly probability, km range, km/h, m elevation per km, has GPS
  { type: 'Run', p: 2.2, km: [5, 21], speed: 11, climb: 12, gps: 0.95 },
  { type: 'TrailRun', p: 0.4, km: [8, 30], speed: 8, climb: 45, gps: 1 },
  { type: 'Ride', p: 1.2, km: [25, 110], speed: 26, climb: 11, gps: 1 },
  { type: 'VirtualRide', p: 0.3, km: [20, 45], speed: 30, climb: 6, gps: 0 },
  { type: 'Swim', p: 0.7, km: [1, 3], speed: 3, climb: 0, gps: 0.2 },
  { type: 'Hike', p: 0.25, km: [8, 22], speed: 4, climb: 60, gps: 1 },
  { type: 'Walk', p: 0.8, km: [3, 9], speed: 5, climb: 8, gps: 0.9 },
];

function fakeTrack(rand, km) {
  // Closed loop with wobble around a fixed point; real-world position is irrelevant (normalized).
  const n = 80;
  const radius = km / (2 * Math.PI) / 111;
  const lobes = 2 + Math.floor(rand() * 4);
  const phase = rand() * Math.PI * 2;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = radius * (1 + 0.35 * Math.sin(lobes * t + phase) + 0.1 * (rand() - 0.5));
    pts.push([43.58 + r * Math.sin(t), 7.12 + (r * Math.cos(t)) / Math.cos((43.58 * Math.PI) / 180)]);
  }
  return encodePolyline(pts);
}

export function fakeActivities(today) {
  const rand = mulberry32(42);
  const end = Date.parse(`${today}T00:00:00Z`);
  const start = end - 5 * 365 * 86_400_000;
  const out = [];
  let id = 1;
  for (let ms = start; ms <= end; ms += 86_400_000) {
    const date = new Date(ms);
    const month = date.getUTCMonth();
    const season = 0.75 + 0.35 * Math.sin(((month - 2) / 12) * Math.PI * 2);
    for (const prof of PROFILES) {
      if (rand() > (prof.p / 7) * season) continue;
      const km = prof.km[0] + rand() * (prof.km[1] - prof.km[0]);
      const hour = 6 + Math.floor(rand() * 13);
      const iso = `${date.toISOString().slice(0, 10)}T${String(hour).padStart(2, '0')}:15:00Z`;
      out.push({
        id: id++,
        name: 'fake',
        sport_type: prof.type,
        start_date_local: iso,
        distance: Math.round(km * 1000),
        moving_time: Math.round((km / prof.speed) * 3600),
        total_elevation_gain: Math.round(km * prof.climb * (0.6 + rand() * 0.8)),
        map: { summary_polyline: rand() < prof.gps ? fakeTrack(rand, km) : '' },
      });
    }
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outPath = process.argv[2];
  const todayFlag = process.argv.indexOf('--today');
  const today = todayFlag > 0 ? process.argv[todayFlag + 1] : new Date().toISOString().slice(0, 10);
  if (!outPath) throw new Error('Usage: node fake-activities.mjs <out.json> [--today YYYY-MM-DD]');
  writeFileSync(outPath, JSON.stringify(fakeActivities(today)));
  console.log(`Wrote fake activities to ${outPath}`);
}
