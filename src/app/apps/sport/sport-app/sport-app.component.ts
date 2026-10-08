import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslationKey } from '../../../core/i18n/translations';
import { ThemeService } from '../../../core/theme/theme.service';
import { BreakpointService } from '../../../core/breakpoint/breakpoint.service';
import { MobileNavService } from '../../../core/mobile-nav/mobile-nav.service';
import { SPORT_FILTERS, SportFilter } from '../../../content/sport.model';
import { SPORT_STATS } from '../../../content/sport-stats.data';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-palette/sport-palette';
import { SportBreakdownComponent } from '../sport-breakdown/sport-breakdown.component';
import { CalendarHeatmapComponent } from '../calendar-heatmap/calendar-heatmap.component';
import { OverviewComponent } from '../overview/overview.component';
import { YearlyCumulativeComponent } from '../yearly-cumulative/yearly-cumulative.component';
import { RouteGridComponent } from '../route-grid/route-grid.component';
import { WeeklyVolumeComponent } from '../weekly-volume/weekly-volume.component';

export type SportSection = 'overview' | 'calendar' | 'volume' | 'years' | 'routes' | 'sports';

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
  readonly #mobileNav = inject(MobileNavService);
  protected readonly i18n = inject(I18nService);

  protected readonly sections = SECTIONS;
  /** Only sports that have activity get a chip. */
  protected readonly filters = SPORT_FILTERS.filter(
    (k) => k === 'all' || SPORT_STATS.totals[k].activities > 0,
  );
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

  constructor() {
    // On mobile the section is a pushed screen: the shell's single navigation bar pops it
    // back to the list, rather than a second back button rendered inside the content.
    effect(() => {
      if (this.isMobile() && this.#mobileDetail()) {
        this.#mobileNav.push({
          backLabelKey: 'sportBackToSections',
          back: () => this.#mobileDetail.set(false),
        });
      } else {
        this.#mobileNav.clear();
      }
    });
    inject(DestroyRef).onDestroy(() => this.#mobileNav.clear());
  }

  protected selectSection(id: SportSection): void {
    this.#section.set(id);
    this.#mobileDetail.set(true);
  }

  protected selectSport(key: SportFilter): void {
    this.#sport.set(key);
  }
}
