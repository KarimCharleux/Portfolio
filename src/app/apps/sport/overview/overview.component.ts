import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslationKey } from '../../../core/i18n/translations';
import { SportFilter, SportTotals } from '../../../content/sport.model';
import { SPORT_STATS } from '../../../content/sport-stats.data';

const COUNT_UP_MS = 900;

interface Equivalence {
  value: number;
  labelKey: TranslationKey;
}

/** Real-world references. Distances in km, heights in m. */
function equivalences(sport: SportFilter, t: SportTotals): Equivalence[] {
  const out: Equivalence[] = [];
  if (sport === 'swim') {
    out.push({ value: t.distanceKm / 33, labelKey: 'equivChannel' });
  } else {
    out.push({ value: t.distanceKm / 775, labelKey: 'equivParisMarseille' });
    out.push({ value: t.distanceKm / 40075, labelKey: 'equivEarth' });
  }
  if (sport === 'run') {
    out.push({ value: t.distanceKm / 42.195, labelKey: 'equivMarathons' });
  }
  if (t.elevationM >= 8849) {
    out.push({ value: t.elevationM / 8849, labelKey: 'equivEverest' });
  } else if (t.elevationM > 0) {
    out.push({ value: t.elevationM / 4806, labelKey: 'equivMontBlanc' });
  }
  return out.filter((e) => e.value >= 0.1);
}

@Component({
  selector: 'app-sport-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  readonly #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  /** 0 -> 1 count-up progress. Starts at 1 so the prerendered HTML shows the real figures. */
  readonly #progress = signal(1);

  protected readonly totals = computed(() => SPORT_STATS.totals[this.sport()]);
  protected readonly isEmpty = computed(() => this.totals().activities === 0);

  readonly #int = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 0 }),
  );
  readonly #one = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 1 }),
  );

  protected readonly figures = computed(() => {
    const t = this.totals();
    const p = this.#progress();
    const int = this.#int();
    return [
      {
        id: 'distance',
        labelKey: 'sportDistance' as const,
        value: int.format(t.distanceKm * p),
        unit: this.i18n.t('sportKm'),
      },
      {
        id: 'duration',
        labelKey: 'sportDuration' as const,
        value: int.format(t.movingHours * p),
        unit: this.i18n.t('sportHoursShort'),
      },
      {
        id: 'climb',
        labelKey: 'sportClimb' as const,
        value: int.format(t.elevationM * p),
        unit: 'm',
      },
      {
        id: 'count',
        labelKey: 'sportCount' as const,
        value: int.format(t.activities * p),
        unit: '',
      },
    ];
  });

  protected readonly equivalences = computed(() =>
    equivalences(this.sport(), this.totals()).map((e) => ({
      id: e.labelKey,
      value: `${this.#one().format(e.value)}×`,
      label: this.i18n.t(e.labelKey),
    })),
  );

  constructor() {
    afterNextRender(() => {
      if (!this.#isBrowser || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / COUNT_UP_MS, 1);
        this.#progress.set(1 - Math.pow(1 - t, 3));
        if (t < 1) requestAnimationFrame(tick);
      };
      this.#progress.set(0);
      requestAnimationFrame(tick);
    });
  }
}
