import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslationKey } from '../../../core/i18n/translations';
import { ThemeService } from '../../../core/theme/theme.service';
import { BreakpointService } from '../../../core/breakpoint/breakpoint.service';
import { SPORT_FILTERS, SportFilter } from '../../../content/sport.model';
import { SPORT_STATS } from '../../../content/sport-stats.data';
import { SportBreakdownComponent } from '../sport-breakdown/sport-breakdown.component';
import { CalendarHeatmapComponent } from '../calendar-heatmap/calendar-heatmap.component';
import { OverviewComponent } from '../overview/overview.component';
import { YearlyCumulativeComponent } from '../yearly-cumulative/yearly-cumulative.component';
import { RouteGridComponent } from '../route-grid/route-grid.component';
import { WeeklyVolumeComponent } from '../weekly-volume/weekly-volume.component';

export type SportSection = 'overview' | 'calendar' | 'volume' | 'years' | 'routes' | 'sports';

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

/**
 * Active-chip ink class per filter, picked so text is >= 4.5:1 on the chip color.
 * White fails on all/run/ride/swim (and hike in dark); dark ink fails on hike (light) and walk.
 */
const CHIP_INK_CLASS: Record<SportFilter, 'dark-ink' | 'hike-ink' | null> = {
  all: 'dark-ink',
  run: 'dark-ink',
  ride: 'dark-ink',
  swim: 'dark-ink',
  hike: 'hike-ink',
  walk: null,
};

const SECTIONS: ReadonlyArray<{ id: SportSection; labelKey: TranslationKey; icon: string }> = [
  { id: 'overview', labelKey: 'sportOverview', icon: '◉' },
  { id: 'calendar', labelKey: 'sportCalendar', icon: '▦' },
  { id: 'volume', labelKey: 'sportVolume', icon: '≋' },
  { id: 'years', labelKey: 'sportYears', icon: '⟋' },
  { id: 'routes', labelKey: 'sportRoutes', icon: '✎' },
  { id: 'sports', labelKey: 'sportBreakdown', icon: '◔' },
];

@Component({
  selector: 'app-sport',
  imports: [
    OverviewComponent,
    CalendarHeatmapComponent,
    WeeklyVolumeComponent,
    YearlyCumulativeComponent,
    SportBreakdownComponent,
    RouteGridComponent,
  ],
  templateUrl: './sport-app.component.html',
  styleUrl: './sport-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportAppComponent {
  readonly #theme = inject(ThemeService);
  readonly #breakpoint = inject(BreakpointService);
  protected readonly i18n = inject(I18nService);

  protected readonly sections = SECTIONS;
  protected readonly filters = SPORT_FILTERS;
  protected readonly labelKeys = SPORT_LABEL_KEYS;
  protected readonly color = sportColor;
  protected readonly chipInk = CHIP_INK_CLASS;

  readonly #section = signal<SportSection>('overview');
  protected readonly section = this.#section.asReadonly();
  readonly #sport = signal<SportFilter>('all');
  protected readonly sport = this.#sport.asReadonly();
  /** Mobile only: false shows the section list, true shows the selected section. */
  readonly #mobileDetail = signal(false);

  protected readonly isMobile = this.#breakpoint.isMobile;
  protected readonly showList = computed(() => !this.isMobile() || !this.#mobileDetail());
  protected readonly showDetail = computed(() => !this.isMobile() || this.#mobileDetail());
  protected readonly attributionSrc = computed(() =>
    this.#theme.isDark()
      ? '/sport/powered-by-strava-dark.svg'
      : '/sport/powered-by-strava-light.svg',
  );
  protected readonly sectionLabelKey = computed(
    () => SECTIONS.find((s) => s.id === this.#section())?.labelKey ?? 'sportOverview',
  );

  readonly #dateFormat = computed(
    () =>
      new Intl.DateTimeFormat(this.i18n.locale(), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
  );
  protected readonly updatedLabel = computed(
    () =>
      `${this.i18n.t('sportUpdated')} ${this.#dateFormat().format(new Date(`${SPORT_STATS.generatedAt}T12:00:00Z`))}`,
  );

  protected selectSection(id: SportSection): void {
    this.#section.set(id);
    this.#mobileDetail.set(true);
  }

  protected backToList(): void {
    this.#mobileDetail.set(false);
  }

  protected selectSport(key: SportFilter): void {
    this.#sport.set(key);
  }
}
