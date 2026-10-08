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

export interface SportWeek {
  /** ISO date (Monday) of the week. */
  start: string;
  /** Moving hours per sport that week, every key present (zero-filled). */
  hours: Record<SportKey, number>;
}

/**
 * Everything the Sport app renders, precomputed by `scripts/strava/fetch-strava.mjs`.
 * The app only reads this; it never aggregates.
 */
export interface SportStats {
  /** ISO date the snapshot was generated ("today" for the pipeline). */
  generatedAt: string;
  /** ISO date of the oldest included activity. */
  firstActivity: string;
  totals: Record<SportFilter, SportTotals>;
  /** ISO date -> moving minutes per sport, only days with activity. */
  days: Record<string, Partial<Record<SportKey, number>>>;
  /** Continuous, zero-filled, oldest first. */
  weeks: SportWeek[];
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
