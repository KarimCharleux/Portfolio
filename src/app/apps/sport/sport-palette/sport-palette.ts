import { TranslationKey } from '../../../core/i18n/translations';
import { SportFilter } from '../../../content/sport.model';

/** CSS color for a sport (or the accent for "all"), resolved from design tokens. */
export function sportColor(key: SportFilter): string {
  return key === 'all' ? 'var(--sport-accent)' : `var(--sport-${key})`;
}

export const SPORT_LABEL_KEYS: Record<SportFilter, TranslationKey> = {
  all: 'sportAll',
  run: 'sportRun',
  ride: 'sportRide',
  swim: 'sportSwim',
  hike: 'sportHike',
  walk: 'sportWalk',
};
