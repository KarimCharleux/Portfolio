// Pure functions shared by fetch-strava.mjs. No I/O, no globals, deterministic for a given input.

/** Strava `sport_type` -> portfolio sport key. Anything absent is ignored. */
const SPORT_TYPE_MAP = {
  Run: 'run',
  TrailRun: 'run',
  VirtualRun: 'run',
  Ride: 'ride',
  MountainBikeRide: 'ride',
  GravelRide: 'ride',
  VirtualRide: 'ride',
  EBikeRide: 'ride',
  EMountainBikeRide: 'ride',
  Swim: 'swim',
  Hike: 'hike',
  Walk: 'walk',
};

export const SPORT_KEYS = ['run', 'ride', 'swim', 'hike', 'walk'];
export const SPORT_FILTERS = ['all', ...SPORT_KEYS];

const MAX_ROUTE_POINTS = 32;
const DAY_MS = 86_400_000;

export function toSportKey(sportType) {
  return SPORT_TYPE_MAP[sportType] ?? null;
}

const round = (value, decimals) => {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
};

/** `start_date_local` is local wall-clock time encoded with a misleading `Z`: keep the date part. */
const localDate = (activity) => activity.start_date_local.slice(0, 10);

const utcMs = (isoDate) => Date.parse(`${isoDate}T00:00:00Z`);
const isoFromMs = (ms) => new Date(ms).toISOString().slice(0, 10);

/** Monday of the ISO week containing `isoDate`. */
export function weekStart(isoDate) {
  const ms = utcMs(isoDate);
  const dayFromMonday = (new Date(ms).getUTCDay() + 6) % 7;
  return isoFromMs(ms - dayFromMonday * DAY_MS);
}

/** 0-based index of the 7-day block of the year (days 1-7 -> 0 ... days 358-366 -> 51 or 52). */
export function weekOfYear(isoDate) {
  const year = Number(isoDate.slice(0, 4));
  const dayOfYear = Math.floor((utcMs(isoDate) - Date.UTC(year, 0, 1)) / DAY_MS);
  return Math.min(Math.floor(dayOfYear / 7), 52);
}

const zeroTotals = () => ({ distanceKm: 0, movingHours: 0, elevationM: 0, activities: 0 });
const zeroBySport = () => Object.fromEntries(SPORT_KEYS.map((k) => [k, 0]));

/** Keeps the five sports and normalizes the fields the pipeline uses. */
export function normalizeActivities(raw) {
  return raw
    .map((a) => ({
      sport: toSportKey(a.sport_type),
      date: localDate(a),
      distanceKm: (a.distance ?? 0) / 1000,
      movingHours: (a.moving_time ?? 0) / 3600,
      elevationM: a.total_elevation_gain ?? 0,
      polyline: a.map?.summary_polyline || null,
    }))
    .filter((a) => a.sport !== null)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

export function buildStats(raw, today) {
  const activities = normalizeActivities(raw);
  if (activities.length === 0) {
    throw new Error('No activity of a supported sport: refusing to write an empty snapshot.');
  }

  const totals = Object.fromEntries(SPORT_FILTERS.map((f) => [f, zeroTotals()]));
  const days = {};
  const weekHours = new Map();

  for (const a of activities) {
    for (const key of ['all', a.sport]) {
      const t = totals[key];
      t.distanceKm += a.distanceKm;
      t.movingHours += a.movingHours;
      t.elevationM += a.elevationM;
      t.activities += 1;
    }
    days[a.date] ??= {};
    days[a.date][a.sport] = (days[a.date][a.sport] ?? 0) + Math.round(a.movingHours * 60);

    const ws = weekStart(a.date);
    if (!weekHours.has(ws)) weekHours.set(ws, zeroBySport());
    weekHours.get(ws)[a.sport] += a.movingHours;
  }

  for (const t of Object.values(totals)) {
    t.distanceKm = round(t.distanceKm, 1);
    t.movingHours = round(t.movingHours, 1);
    t.elevationM = Math.round(t.elevationM);
  }

  const firstActivity = activities[0].date;
  const weeks = [];
  for (let ms = utcMs(weekStart(firstActivity)); ms <= utcMs(weekStart(today)); ms += 7 * DAY_MS) {
    const start = isoFromMs(ms);
    const hours = weekHours.get(start) ?? zeroBySport();
    weeks.push({
      start,
      hours: Object.fromEntries(SPORT_KEYS.map((k) => [k, round(hours[k], 2)])),
    });
  }

  return {
    generatedAt: today,
    firstActivity,
    totals,
    days,
    weeks,
    yearlyCumulativeKm: buildYearlyCumulative(activities, firstActivity, today),
  };
}

function buildYearlyCumulative(activities, firstActivity, today) {
  const firstYear = Number(firstActivity.slice(0, 4));
  const currentYear = Number(today.slice(0, 4));
  const currentWeek = weekOfYear(today);
  const result = Object.fromEntries(SPORT_FILTERS.map((f) => [f, {}]));

  for (const filter of SPORT_FILTERS) {
    for (let year = firstYear; year <= currentYear; year++) {
      const perWeek = new Array(53).fill(0);
      for (const a of activities) {
        if (Number(a.date.slice(0, 4)) !== year) continue;
        if (filter !== 'all' && a.sport !== filter) continue;
        perWeek[weekOfYear(a.date)] += a.distanceKm;
      }
      const length = year === currentYear ? currentWeek + 1 : 53;
      let acc = 0;
      result[filter][String(year)] = perWeek.slice(0, length).map((km) => round((acc += km), 1));
    }
  }
  return result;
}

/** Google encoded polyline -> [[lat, lng], ...]. */
export function decodePolyline(encoded) {
  const points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  while (index < encoded.length) {
    for (const axis of [0, 1]) {
      let result = 0;
      let shift = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const delta = result & 1 ? ~(result >> 1) : result >> 1;
      if (axis === 0) lat += delta;
      else lng += delta;
    }
    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

/** Ramer-Douglas-Peucker, tolerance raised until at most `max` points remain. */
function simplify(points, max) {
  if (points.length <= max) return points;
  const rdp = (pts, eps) => {
    if (pts.length < 3) return pts;
    const [ax, ay] = pts[0];
    const [bx, by] = pts[pts.length - 1];
    const len = Math.hypot(bx - ax, by - ay) || 1e-12;
    let maxDist = -1;
    let maxIndex = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const [px, py] = pts[i];
      const dist = Math.abs((by - ay) * px - (bx - ax) * py + bx * ay - by * ax) / len;
      if (dist > maxDist) {
        maxDist = dist;
        maxIndex = i;
      }
    }
    if (maxDist <= eps) return [pts[0], pts[pts.length - 1]];
    return [...rdp(pts.slice(0, maxIndex + 1), eps).slice(0, -1), ...rdp(pts.slice(maxIndex), eps)];
  };
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const extent = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  let eps = extent / 1000;
  let out = rdp(points, eps);
  while (out.length > max) {
    eps *= 1.5;
    out = rdp(points, eps);
  }
  return out;
}

/**
 * Encoded polyline -> flat unit-square points, or null when the shape is degenerate
 * (fewer than 2 points, or no extent at all, e.g. an indoor activity with a stub track).
 */
export function shapeFromPolyline(encoded) {
  const latLng = decodePolyline(encoded);
  if (latLng.length < 2) return null;
  const meanLat = latLng.reduce((s, p) => s + p[0], 0) / latLng.length;
  const cos = Math.cos((meanLat * Math.PI) / 180);
  // Local equirectangular plane: x east, y south (SVG y grows downward).
  const plane = simplify(
    latLng.map(([lat, lng]) => [lng * cos, -lat]),
    MAX_ROUTE_POINTS,
  );
  const xs = plane.map((p) => p[0]);
  const ys = plane.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const span = Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY);
  if (span === 0) return null;
  const offX = (1 - (Math.max(...xs) - minX) / span) / 2;
  const offY = (1 - (Math.max(...ys) - minY) / span) / 2;
  return plane.flatMap(([x, y]) => [round((x - minX) / span + offX, 3), round((y - minY) / span + offY, 3)]);
}

/** Newest first, only activities with a usable track. */
export function buildRoutes(raw) {
  return normalizeActivities(raw)
    .filter((a) => a.polyline)
    .map((a) => ({
      sport: a.sport,
      date: a.date,
      distanceKm: round(a.distanceKm, 1),
      points: shapeFromPolyline(a.polyline),
    }))
    .filter((r) => r.points !== null)
    .reverse();
}
