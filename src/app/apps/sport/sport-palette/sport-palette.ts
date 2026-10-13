import { TranslationKey } from '../../../core/i18n/translations';
import { SportFilter } from '../../../content/sport.model';
import { SportIconName } from '../sport-icon/sport-icon.component';

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

export const SPORT_ICONS: Record<SportFilter, SportIconName> = {
  all: 'grid',
  run: 'run',
  ride: 'ride',
  swim: 'swim',
  hike: 'hike',
  walk: 'walk',
};
