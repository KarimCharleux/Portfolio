import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { ClockService } from '../../core/clock/clock.service';
import { TranslationKey } from '../../core/i18n/translations';
import { CAREER } from '../../content/career.data';
import { CareerKind, CareerStep } from '../../content/content.model';

/** Months since year 0, so date math is plain integer arithmetic. */
function monthIndex(yearMonth: string): number {
  const [year, month] = yearMonth.split('-').map(Number);
  return year * 12 + month - 1;
}

interface Bar {
  readonly id: string;
  readonly left: number;
  readonly width: number;
}

const KINDS: ReadonlyArray<{
  kind: CareerKind;
  trackKey: TranslationKey;
  headingKey: TranslationKey;
}> = [
  { kind: 'work', trackKey: 'careerTrackWork', headingKey: 'careerWork' },
  { kind: 'school', trackKey: 'careerTrackSchool', headingKey: 'careerSchool' },
];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar-app.component.html',
  styleUrl: './calendar-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarAppComponent {
  readonly #clock = inject(ClockService);

  protected readonly i18n = inject(I18nService);
  /** Id of the step under the pointer: lights its bar and its row, dims the other bars. */
  protected readonly hovered = signal<string | null>(null);

  // Equal-value numbers stop propagation, so the per-second clock tick only
  // reaches the layout below when the month actually changes.
  readonly #nowMonth = computed(() => {
    const now = this.#clock.now();
    return now.getFullYear() * 12 + now.getMonth();
  });

  readonly #steps = computed(() => CAREER[this.i18n.lang()]);

  readonly #range = computed(() => {
    const firstYear = Math.min(...this.#steps().map((s) => Math.floor(monthIndex(s.start) / 12)));
    const lastYear = Math.floor(this.#nowMonth() / 12);
    return { firstYear, lastYear, start: firstYear * 12, end: (lastYear + 1) * 12 };
  });

  protected readonly firstYear = computed(() => this.#range().firstYear);

  protected readonly years = computed(() => {
    const { firstYear, lastYear } = this.#range();
    return Array.from({ length: lastYear - firstYear + 1 }, (_, i) => {
      const year = firstYear + i;
      return { year, left: this.#percent(year * 12 + 6) };
    });
  });

  protected readonly todayLeft = computed(() => this.#percent(this.#nowMonth() + 0.5));

  protected readonly tracks = computed(() =>
    KINDS.map(({ kind, trackKey }) => ({
      kind,
      trackKey,
      lanes: this.#lanes(this.#steps().filter((s) => s.kind === kind)),
    })),
  );

  protected readonly columns = computed(() =>
    KINDS.map(({ kind, headingKey }) => ({
      kind,
      headingKey,
      steps: this.#steps()
        .filter((s) => s.kind === kind)
        .map((step) => ({ step, ...this.#when(step) })),
    })),
  );

  #endMonth(step: CareerStep): number {
    return (step.end ? monthIndex(step.end) : this.#nowMonth()) + 1;
  }

  #percent(month: number): number {
    const { start, end } = this.#range();
    return ((month - start) / (end - start)) * 100;
  }

  /** Overlapping steps of one kind go on a thin sub-lane rather than blending together. */
  #lanes(steps: readonly CareerStep[]): Bar[][] {
    const lanes: Array<{ end: number; bars: Bar[] }> = [];
    [...steps]
      .sort((a, b) => monthIndex(a.start) - monthIndex(b.start))
      .forEach((step) => {
        const start = monthIndex(step.start);
        const end = this.#endMonth(step);
        let lane = lanes.find((l) => l.end <= start);
        if (!lane) {
          lane = { end: 0, bars: [] };
          lanes.push(lane);
        }
        lane.end = end;
        lane.bars.push({
          id: step.id,
          left: this.#percent(start),
          width: this.#percent(end) - this.#percent(start),
        });
      });
    return lanes.map((l) => l.bars);
  }

  /** Years only (`2022 → 2025`), or year plus length for a step inside one year. */
  #when(step: CareerStep): { from: string; to: string | null; months: number | null } {
    const from = step.start.slice(0, 4);
    if (!step.end) return { from, to: null, months: null };
    const to = step.end.slice(0, 4);
    if (to !== from) return { from, to, months: null };
    return { from, to, months: this.#endMonth(step) - monthIndex(step.start) };
  }
}
