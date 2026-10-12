import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { RouteShape, SportFilter } from '../../../content/sport.model';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-palette/sport-palette';

const PAGE = 120;

type LoadState = 'loading' | 'ready' | 'error';

interface RouteView {
  id: string;
  index: number;
  d: string;
  color: string;
  sportLabel: string;
  km: string;
  date: string;
  title: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

function toPath(points: number[]): string {
  let d = '';
  for (let i = 0; i < points.length; i += 2) {
    d += `${i === 0 ? 'M' : 'L'}${points[i]} ${points[i + 1]}`;
  }
  return d;
}

@Component({
  selector: 'app-sport-route-grid',
  templateUrl: './route-grid.component.html',
  styleUrl: './route-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteGridComponent {
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  readonly #state = signal<LoadState>('loading');
  protected readonly state = this.#state.asReadonly();
  readonly #routes = signal<readonly RouteShape[]>([]);
  readonly #limit = signal(PAGE);
  /** Index (in the filtered list) of the route shown large; a new filter starts from its newest. */
  readonly #selected = linkedSignal({ source: this.sport, computation: () => 0 });
  protected readonly selected = this.#selected.asReadonly();

  readonly #filtered = computed(() => {
    const s = this.sport();
    return s === 'all' ? this.#routes() : this.#routes().filter((r) => r.sport === s);
  });

  readonly #shortDate = computed(
    () =>
      new Intl.DateTimeFormat(this.i18n.locale(), {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }),
  );
  readonly #longDate = computed(
    () =>
      new Intl.DateTimeFormat(this.i18n.locale(), {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }),
  );
  readonly #km = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 1 }),
  );

  readonly #views = computed<RouteView[]>(() =>
    this.#filtered().map((r, i) => {
      const p = r.points;
      const sportLabel = this.i18n.t(SPORT_LABEL_KEYS[r.sport]);
      const km = `${this.#km().format(r.distanceKm)} ${this.i18n.t('sportKm')}`;
      const date = new Date(`${r.date}T00:00:00Z`);
      return {
        id: `${r.date}-${r.sport}-${r.distanceKm}-${i}`,
        index: i,
        d: toPath(p),
        color: sportColor(r.sport),
        sportLabel,
        km,
        date: this.#longDate().format(date),
        title: `${sportLabel} · ${km} · ${this.#shortDate().format(date)}`,
        start: { x: p[0], y: p[1] },
        end: { x: p[p.length - 2], y: p[p.length - 1] },
      };
    }),
  );

  protected readonly shapes = computed(() => this.#views().slice(0, this.#limit()));
  /**
   * One-element list so `@for … track id` recreates the hero SVG whenever the selection
   * changes, which replays its CSS draw-in animation for the new route.
   */
  protected readonly featured = computed(() => {
    const v = this.#views()[this.#selected()];
    return v ? [v] : [];
  });
  protected readonly count = computed(() => this.#views().length);

  protected readonly hasMore = computed(() => this.#filtered().length > this.#limit());
  protected readonly isEmpty = computed(
    () => this.#state() === 'ready' && this.#filtered().length === 0,
  );

  constructor() {
    // Browser only: prerender never fetches, so the grid is never part of the static HTML.
    afterNextRender(() => {
      fetch('/sport/routes.json')
        .then((res) => {
          if (!res.ok) throw new Error(`routes.json ${res.status}`);
          return res.json() as Promise<RouteShape[]>;
        })
        .then((routes) => {
          this.#routes.set(routes);
          this.#state.set('ready');
        })
        .catch((err: unknown) => {
          console.error(err);
          this.#state.set('error');
        });
    });
  }

  protected select(index: number): void {
    this.#selected.set(index);
  }

  protected step(delta: number): void {
    const n = this.count();
    if (n === 0) return;
    const next = (this.#selected() + delta + n) % n;
    this.#selected.set(next);
    // Keep the newly featured route reachable in the thumbnail grid below.
    if (next >= this.#limit()) this.#limit.set((Math.floor(next / PAGE) + 1) * PAGE);
  }

  protected showMore(): void {
    this.#limit.update((n) => n + PAGE);
  }
}
