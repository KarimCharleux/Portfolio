import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import { max } from 'd3-array';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SportFilter } from '../../../content/sport.model';
import { SPORT_STATS } from '../../../content/sport-stats.data';
import { sportColor } from '../sport-palette/sport-palette';
import { injectChartSize } from '../chart-size/chart-size';
import { ChartTooltipComponent } from '../chart-tooltip/chart-tooltip.component';

/** Prerender size, and the floor below which the chart scrolls instead of squashing. */
const FALLBACK = { width: 640, height: 320 };
const MIN_HEIGHT = 240;
const M = { top: 12, right: 64, bottom: 24, left: 44 };
const CURRENT_YEAR = SPORT_STATS.generatedAt.slice(0, 4);
/** Minimum vertical distance between two end-of-line labels sharing the same x (10px text). */
const LABEL_GAP = 12;

/**
 * Pushes overlapping labels apart, keeping their order and staying inside [min, max]:
 * a downward pass enforces the gap, then an upward pass pulls back anything pushed past max.
 */
function spreadLabels(ys: readonly number[], min: number, max: number): number[] {
  const order = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  for (let k = 1; k < order.length; k++) {
    order[k].y = Math.max(order[k].y, order[k - 1].y + LABEL_GAP);
  }
  order[order.length - 1].y = Math.min(order[order.length - 1].y, max);
  for (let k = order.length - 2; k >= 0; k--) {
    order[k].y = Math.max(Math.min(order[k].y, order[k + 1].y - LABEL_GAP), min);
  }
  const out = [...ys];
  for (const { y, i } of order) out[i] = y;
  return out;
}

@Component({
  selector: 'app-sport-yearly-cumulative',
  imports: [ChartTooltipComponent],
  templateUrl: './yearly-cumulative.component.html',
  styleUrl: './yearly-cumulative.component.scss',
  host: { style: 'display: block; position: relative; flex: 1 1 0; min-height: 0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyCumulativeComponent {
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  readonly #size = injectChartSize(FALLBACK);
  protected readonly width = computed(() => this.#size().width);
  protected readonly height = computed(() => Math.max(MIN_HEIGHT, this.#size().height));
  protected readonly margin = M;
  readonly #hoverWeek = signal<number | null>(null);

  readonly #years = computed(() => {
    const byYear = SPORT_STATS.yearlyCumulativeKm[this.sport()];
    // Oldest first, so the current year is drawn last (on top).
    return Object.keys(byYear)
      .sort()
      .map((year) => ({ year, values: byYear[year] }));
  });

  protected readonly isEmpty = computed(() =>
    this.#years().every((y) => (y.values.at(-1) ?? 0) === 0),
  );

  readonly #x = computed(() =>
    scaleLinear()
      .domain([0, 52])
      .range([M.left, this.width() - M.right]),
  );
  readonly #y = computed(() =>
    scaleLinear()
      .domain([0, Math.max(max(this.#years(), (y) => y.values.at(-1) ?? 0) ?? 0, 1)])
      .nice()
      .range([this.height() - M.bottom, M.top]),
  );

  readonly #int = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 0 }),
  );

  protected readonly lines = computed(() => {
    const x = this.#x();
    const y = this.#y();
    const years = this.#years();
    const gen = line<number>()
      .x((_, i) => x(i))
      .y((v) => y(v))
      .curve(curveMonotoneX);
    const raw = years.map((entry) => {
      const last = entry.values.length - 1;
      return { x: x(last) + 6, y: y(entry.values[last] ?? 0) + 3 };
    });
    // Past years all end at week 52, so their labels share one column and can collide;
    // the current year ends earlier and is spread on its own.
    const labelYs = [...raw.map((p) => p.y)];
    const columns = new Map<number, number[]>();
    raw.forEach((p, i) => columns.set(p.x, [...(columns.get(p.x) ?? []), i]));
    for (const indexes of columns.values()) {
      const spread = spreadLabels(
        indexes.map((i) => raw[i].y),
        M.top + 3,
        this.height() - M.bottom + 3,
      );
      indexes.forEach((i, k) => (labelYs[i] = spread[k]));
    }
    return years.map((entry, i) => {
      const current = entry.year === CURRENT_YEAR;
      const last = entry.values.length - 1;
      return {
        year: entry.year,
        d: gen(entry.values) ?? '',
        current,
        // Past years fade with age: the oldest is the faintest.
        opacity: current ? 1 : 0.35 + (0.5 * (i + 1)) / years.length,
        labelX: raw[i].x,
        labelY: labelYs[i],
        label: `${entry.year} · ${this.#int().format(entry.values[last] ?? 0)}`,
      };
    });
  });

  protected readonly color = computed(() => sportColor(this.sport()));

  protected readonly yTicks = computed(() => {
    const y = this.#y();
    return y.ticks(5).map((v) => ({ v, y: y(v), label: this.#int().format(v) }));
  });

  readonly #monthFormat = computed(
    () => new Intl.DateTimeFormat(this.i18n.locale(), { month: 'short', timeZone: 'UTC' }),
  );
  protected readonly xTicks = computed(() => {
    const x = this.#x();
    const fmt = this.#monthFormat();
    return [0, 2, 4, 6, 8, 10].map((m) => {
      const dayOfYear = Math.round((Date.UTC(2023, m, 1) - Date.UTC(2023, 0, 1)) / 86_400_000);
      return { id: m, x: x(dayOfYear / 7), label: fmt.format(new Date(Date.UTC(2023, m, 1))) };
    });
  });

  protected readonly hover = computed(() => {
    const week = this.#hoverWeek();
    if (week === null) return null;
    const x = this.#x()(week);
    const rows = this.#years()
      .filter((y) => week < y.values.length)
      .reverse()
      .map((y) => ({
        year: y.year,
        value: `${this.#int().format(y.values[week])} ${this.i18n.t('sportKm')}`,
      }));
    if (rows.length === 0) return null;
    return {
      x,
      y: (M.top + this.height() - M.bottom) / 2,
      title: `${this.i18n.t('sportWeekNumber')} ${week + 1}`,
      rows,
    };
  });

  protected onPointerMove(event: PointerEvent): void {
    const svg = event.currentTarget as SVGSVGElement;
    const px = event.clientX - svg.getBoundingClientRect().left;
    const week = Math.round(this.#x().invert(px));
    this.#hoverWeek.set(Math.min(Math.max(week, 0), 52));
  }

  protected onPointerLeave(): void {
    this.#hoverWeek.set(null);
  }
}
