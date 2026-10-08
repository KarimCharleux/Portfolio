import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { RouteShape, SportFilter } from '../../../content/sport.model';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-app/sport-app.component';

const PAGE = 120;

type LoadState = 'loading' | 'ready' | 'error';

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

  readonly #filtered = computed(() => {
    const s = this.sport();
    return s === 'all' ? this.#routes() : this.#routes().filter((r) => r.sport === s);
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
  readonly #km = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 1 }),
  );

  protected readonly shapes = computed(() =>
    this.#filtered()
      .slice(0, this.#limit())
      .map((r, i) => ({
        id: `${r.date}-${i}`,
        d: toPath(r.points),
        color: sportColor(r.sport),
        title: `${this.i18n.t(SPORT_LABEL_KEYS[r.sport])} · ${this.#km().format(r.distanceKm)} ${this.i18n.t('sportKm')} · ${this.#dateFormat().format(new Date(`${r.date}T00:00:00Z`))}`,
      })),
  );

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

  protected showMore(): void {
    this.#limit.update((n) => n + PAGE);
  }
}
