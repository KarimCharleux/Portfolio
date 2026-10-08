import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { PieArcDatum, arc, pie } from 'd3-shape';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SPORT_KEYS, SportFilter, SportKey } from '../../../content/sport.model';
import { SPORT_STATS } from '../../../content/sport-stats.data';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-app/sport-app.component';

type Metric = 'hours' | 'km';
const SIZE = 240;
const OUTER = SIZE / 2;
const INNER = OUTER * 0.62;

@Component({
  selector: 'app-sport-breakdown',
  templateUrl: './sport-breakdown.component.html',
  styleUrl: './sport-breakdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportBreakdownComponent {
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  readonly #metric = signal<Metric>('hours');
  protected readonly metric = this.#metric.asReadonly();
  protected readonly viewBox = `${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`;

  readonly #value = (k: SportKey) =>
    this.#metric() === 'hours'
      ? SPORT_STATS.totals[k].movingHours
      : SPORT_STATS.totals[k].distanceKm;

  protected readonly total = computed(() => SPORT_KEYS.reduce((s, k) => s + this.#value(k), 0));
  protected readonly isEmpty = computed(() => this.total() === 0);

  readonly #int = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 0 }),
  );
  readonly #pct = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { style: 'percent', maximumFractionDigits: 0 }),
  );

  protected readonly slices = computed(() => {
    const selected = this.sport();
    const pieGen = pie<SportKey>()
      .value((k) => this.#value(k))
      .sort(null)
      .padAngle(0.012);
    const arcGen = arc<PieArcDatum<SportKey>>()
      .innerRadius(INNER)
      .outerRadius(OUTER)
      .cornerRadius(3);
    const unit =
      this.#metric() === 'hours' ? this.i18n.t('sportHoursShort') : this.i18n.t('sportKm');
    return pieGen(SPORT_KEYS.filter((k) => this.#value(k) > 0)).map((p) => ({
      key: p.data,
      d: arcGen(p) ?? '',
      color: sportColor(p.data),
      dimmed: selected !== 'all' && selected !== p.data,
      label: this.i18n.t(SPORT_LABEL_KEYS[p.data]),
      value: `${this.#int().format(this.#value(p.data))} ${unit}`,
      share: this.#pct().format(this.#value(p.data) / this.total()),
    }));
  });

  protected readonly centerValue = computed(() => this.#int().format(this.total()));
  protected readonly centerUnit = computed(() =>
    this.#metric() === 'hours' ? this.i18n.t('sportHours') : this.i18n.t('sportKm'),
  );

  protected setMetric(metric: Metric): void {
    this.#metric.set(metric);
  }
}
