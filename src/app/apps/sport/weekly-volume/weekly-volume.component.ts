import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { scaleLinear, scaleUtc } from 'd3-scale';
import { SeriesPoint, area, curveMonotoneX, stack } from 'd3-shape';
import { bisector, max } from 'd3-array';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SPORT_KEYS, SportFilter, SportKey, SportWeek } from '../../../content/sport.model';
import { SPORT_STATS } from '../../../content/sport-stats.data';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-app/sport-app.component';
import { injectChartWidth } from '../chart-width/chart-width';
import { ChartTooltipComponent } from '../chart-tooltip/chart-tooltip.component';

const HEIGHT = 300;
const M = { top: 12, right: 12, bottom: 24, left: 32 };
const weekDate = (w: SportWeek) => new Date(`${w.start}T00:00:00Z`);

@Component({
  selector: 'app-sport-weekly-volume',
  imports: [ChartTooltipComponent],
  templateUrl: './weekly-volume.component.html',
  styleUrl: './weekly-volume.component.scss',
  host: { style: 'display: block; position: relative' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyVolumeComponent {
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  protected readonly width = injectChartWidth(640);
  protected readonly height = HEIGHT;
  protected readonly margin = M;
  readonly #hoverIndex = signal<number | null>(null);

  protected readonly keys = computed<readonly SportKey[]>(() => {
    const s = this.sport();
    return s === 'all' ? SPORT_KEYS : [s];
  });

  readonly #x = computed(() =>
    scaleUtc()
      .domain([
        weekDate(SPORT_STATS.weeks[0]),
        weekDate(SPORT_STATS.weeks[SPORT_STATS.weeks.length - 1]),
      ])
      .range([M.left, this.width() - M.right]),
  );

  readonly #series = computed(() =>
    stack<SportWeek, SportKey>()
      .keys(this.keys())
      .value((w, k) => w.hours[k])(SPORT_STATS.weeks),
  );

  readonly #y = computed(() => {
    const top = max(this.#series().at(-1) ?? [], (p) => p[1]) ?? 0;
    return scaleLinear()
      .domain([0, Math.max(top, 1)])
      .nice()
      .range([HEIGHT - M.bottom, M.top]);
  });

  protected readonly isEmpty = computed(() =>
    SPORT_STATS.weeks.every((w) => this.keys().every((k) => w.hours[k] === 0)),
  );

  protected readonly layers = computed(() => {
    const x = this.#x();
    const y = this.#y();
    const gen = area<SeriesPoint<SportWeek>>()
      .x((p) => x(weekDate(p.data)))
      .y0((p) => y(p[0]))
      .y1((p) => y(p[1]))
      .curve(curveMonotoneX);
    return this.#series().map((s) => ({ key: s.key, d: gen(s) ?? '', color: sportColor(s.key) }));
  });

  protected readonly yTicks = computed(() => {
    const y = this.#y();
    return y.ticks(4).map((v) => ({ v, y: y(v) }));
  });

  protected readonly xTicks = computed(() => {
    const x = this.#x();
    return x
      .ticks(6)
      .map((d) => ({ id: d.toISOString(), x: x(d), label: String(d.getUTCFullYear()) }));
  });

  readonly #dateFormat = computed(
    () =>
      new Intl.DateTimeFormat(this.i18n.locale(), {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }),
  );
  readonly #hours = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 1 }),
  );

  protected readonly hover = computed(() => {
    const i = this.#hoverIndex();
    if (i === null) return null;
    const week = SPORT_STATS.weeks[i];
    const x = this.#x()(weekDate(week));
    const total = this.keys().reduce((s, k) => s + week.hours[k], 0);
    return {
      x,
      y: this.#y()(total),
      title: `${this.i18n.t('sportWeekOf')} ${this.#dateFormat().format(weekDate(week))}`,
      rows: this.keys()
        .filter((k) => week.hours[k] > 0)
        .map((k) => ({
          key: k,
          color: sportColor(k),
          label: this.i18n.t(SPORT_LABEL_KEYS[k]),
          value: `${this.#hours().format(week.hours[k])} ${this.i18n.t('sportHoursShort')}`,
        })),
    };
  });

  readonly #bisect = bisector<SportWeek, Date>(weekDate).center;

  protected onPointerMove(event: PointerEvent): void {
    const svg = event.currentTarget as SVGSVGElement;
    const px = event.clientX - svg.getBoundingClientRect().left;
    this.#hoverIndex.set(this.#bisect(SPORT_STATS.weeks, this.#x().invert(px)));
  }

  protected onPointerLeave(): void {
    this.#hoverIndex.set(null);
  }
}
