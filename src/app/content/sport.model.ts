export type SportKey = 'run' | 'ride' | 'swim' | 'hike' | 'walk';
export type SportFilter = SportKey | 'all';

export const SPORT_KEYS: readonly SportKey[] = ['run', 'ride', 'swim', 'hike', 'walk'];
export const SPORT_FILTERS: readonly SportFilter[] = ['all', ...SPORT_KEYS];

export interface SportTotals {
  distanceKm: number;
  movingHours: number;
  elevationM: number;
  activities: number;
}

/**
 * Everything the Sport app renders, precomputed by `scripts/strava/fetch-strava.mjs`.
 * The app only reads this; it never aggregates.
 */
export interface SportStats {
  /** ISO date of the last data change (the snapshot is only rewritten when `sourceHash` changes). */
  generatedAt: string;
  /** sha256 of the activity fields the pipeline uses; lets the sync skip when nothing changed. */
  sourceHash: string;
  /** ISO date of the oldest included activity. */
  firstActivity: string;
  totals: Record<SportFilter, SportTotals>;
  /** ISO date -> moving minutes per sport, only days with activity. */
  days: Record<string, Partial<Record<SportKey, number>>>;
  /**
   * Filter -> year -> cumulative km at the end of each week of that year (index 0 = days 1-7).
   * Past years have 53 values; the current year stops at the current week.
   */
  yearlyCumulativeKm: Record<SportFilter, Record<string, number[]>>;
}

export interface RouteShape {
  sport: SportKey;
  /** ISO date. */
  date: string;
  distanceKm: number;
  /** Flat [x0, y0, x1, y1, ...] in the unit square, y pointing down (SVG), 3 decimals. */
  points: number[];
}

export interface TerritoryCell {
  /** [south, west, north, east] in degrees. */
  bounds: [number, number, number, number];
  areaKm2: number;
  /** Activities that crossed the cell, per sport, in `SPORT_KEYS` order. */
  counts: number[];
}

/** Grid cells crossed by shared (Everyone or Followers) outdoor tracks, built by `scripts/strava/transform.mjs`. */
export interface Territory {
  /** Approximate cell edge. */
  cellKm: number;
  cells: TerritoryCell[];
}
