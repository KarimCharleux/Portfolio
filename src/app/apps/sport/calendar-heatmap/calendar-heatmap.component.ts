import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SPORT_KEYS, SportFilter, SportKey } from '../../../content/sport.model';
import { SPORT_STATS } from '../../../content/sport-stats.data';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-app/sport-app.component';

const CELL = 11;
const GAP = 2;
const STEP = CELL + GAP;
const LEFT = 28;
const TOP = 18;
/** Daily moving minutes thresholds for levels 1..4 (0 = no activity). */
const LEVELS = [1, 30, 60, 120];
const DAY_MS = 86_400_000;

interface Cell {
  date: string;
  x: number;
  y: number;
  level: number;
  title: string;
}

@Component({
  selector: 'app-sport-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrl: './calendar-heatmap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeatmapComponent {
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  protected readonly years: readonly number[] = (() => {
    const first = Number(SPORT_STATS.firstActivity.slice(0, 4));
    const last = Number(SPORT_STATS.generatedAt.slice(0, 4));
    return Array.from({ length: last - first + 1 }, (_, i) => last - i);
  })();

  readonly #year = signal(this.years[0]);
  protected readonly year = this.#year.asReadonly();
  protected readonly color = computed(() => sportColor(this.sport()));
  protected readonly width = LEFT + 54 * STEP;
  protected readonly height = TOP + 7 * STEP;
  protected readonly cellSize = CELL;
  protected readonly legendLevels = [0, 1, 2, 3, 4];

  readonly #dateFormat = computed(
    () =>
      new Intl.DateTimeFormat(this.i18n.locale(), {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      }),
  );
  readonly #monthFormat = computed(
    () => new Intl.DateTimeFormat(this.i18n.locale(), { month: 'short', timeZone: 'UTC' }),
  );
  readonly #dayFormat = computed(
    () => new Intl.DateTimeFormat(this.i18n.locale(), { weekday: 'narrow', timeZone: 'UTC' }),
  );

  protected readonly cells = computed<Cell[]>(() => {
    const year = this.#year();
    const sport = this.sport();
    const keys: readonly SportKey[] = sport === 'all' ? SPORT_KEYS : [sport];
    const jan1 = Date.UTC(year, 0, 1);
    const jan1Offset = (new Date(jan1).getUTCDay() + 6) % 7; // Monday = 0
    // Review Focus 2: no cells after the snapshot date, so the future is not "no activity".
    const lastMs = Math.min(
      Date.UTC(year, 11, 31),
      Date.parse(`${SPORT_STATS.generatedAt}T00:00:00Z`),
    );
    const fmt = this.#dateFormat();
    const out: Cell[] = [];
    for (let ms = jan1; ms <= lastMs; ms += DAY_MS) {
      const date = new Date(ms).toISOString().slice(0, 10);
      const index = Math.round((ms - jan1) / DAY_MS) + jan1Offset;
      const day = SPORT_STATS.days[date] ?? {};
      const minutes = keys.reduce((sum, k) => sum + (day[k] ?? 0), 0);
      const level = minutes === 0 ? 0 : LEVELS.filter((t) => minutes >= t).length;
      const parts = keys
        .filter((k) => (day[k] ?? 0) > 0)
        .map(
          (k) =>
            `${this.i18n.t(SPORT_LABEL_KEYS[k])} ${day[k]} ${this.i18n.t('sportMinutesShort')}`,
        );
      out.push({
        date,
        x: LEFT + Math.floor(index / 7) * STEP,
        y: TOP + (index % 7) * STEP,
        level,
        title: [fmt.format(new Date(ms)), ...parts].join(' · '),
      });
    }
    return out;
  });

  protected readonly isEmpty = computed(() => this.cells().every((c) => c.level === 0));

  protected readonly months = computed(() => {
    const year = this.#year();
    const fmt = this.#monthFormat();
    const jan1 = Date.UTC(year, 0, 1);
    const jan1Offset = (new Date(jan1).getUTCDay() + 6) % 7;
    return Array.from({ length: 12 }, (_, m) => {
      const ms = Date.UTC(year, m, 1);
      const index = Math.round((ms - jan1) / DAY_MS) + jan1Offset;
      return { id: m, x: LEFT + Math.floor(index / 7) * STEP, label: fmt.format(new Date(ms)) };
    });
  });

  protected readonly weekdays = computed(() => {
    const fmt = this.#dayFormat();
    // 2024-01-01 is a Monday; label Mon, Wed, Fri like GitHub.
    return [0, 2, 4].map((i) => ({
      id: i,
      y: TOP + i * STEP + CELL - 1,
      label: fmt.format(new Date(Date.UTC(2024, 0, 1 + i))),
    }));
  });

  protected selectYear(year: number): void {
    this.#year.set(year);
  }
}
