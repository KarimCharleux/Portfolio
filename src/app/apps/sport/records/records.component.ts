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
import { TranslationKey } from '../../../core/i18n/translations';
import { RouteShape, SPORT_KEYS, SportFilter } from '../../../content/sport.model';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-palette/sport-palette';

type LoadState = 'loading' | 'ready' | 'error';

interface RecordCard {
  id: string;
  kickers: string;
  sportLabel: string;
  km: string;
  date: string;
  color: string;
  d: string;
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

/**
 * A few routes that tell a story (longest per sport, first, latest), each drawn in large.
 * `routes.json` is newest first, so index 0 is the latest and the last index the first.
 */
@Component({
  selector: 'app-sport-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsComponent {
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  readonly #state = signal<LoadState>('loading');
  protected readonly state = this.#state.asReadonly();
  readonly #routes = signal<readonly RouteShape[]>([]);

  readonly #dateFormat = computed(
    () =>
      new Intl.DateTimeFormat(this.i18n.locale(), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }),
  );
  readonly #km = computed(
    () => new Intl.NumberFormat(this.i18n.locale(), { maximumFractionDigits: 1 }),
  );

  protected readonly cards = computed<RecordCard[]>(() => {
    const s = this.sport();
    const routes = s === 'all' ? this.#routes() : this.#routes().filter((r) => r.sport === s);
    if (routes.length === 0) return [];

    // Route -> the records it holds, so one route holding two records is drawn once.
    const held = new Map<RouteShape, TranslationKey[]>();
    const hold = (route: RouteShape | undefined, key: TranslationKey) => {
      if (route) held.set(route, [...(held.get(route) ?? []), key]);
    };
    for (const k of s === 'all' ? SPORT_KEYS : [s]) {
      const longest = routes
        .filter((r) => r.sport === k)
        .reduce<RouteShape | undefined>(
          (best, r) => (!best || r.distanceKm > best.distanceKm ? r : best),
          undefined,
        );
      hold(longest, 'sportRecordLongest');
    }
    hold(routes[0], 'sportRecordLatest');
    hold(routes[routes.length - 1], 'sportRecordFirst');

    return [...held].map(([r, keys]) => {
      const p = r.points;
      return {
        id: `${r.date}-${r.sport}-${r.distanceKm}`,
        kickers: keys.map((k) => this.i18n.t(k)).join(' · '),
        sportLabel: this.i18n.t(SPORT_LABEL_KEYS[r.sport]),
        km: this.#km().format(r.distanceKm),
        date: this.#dateFormat().format(new Date(`${r.date}T00:00:00Z`)),
        color: sportColor(r.sport),
        d: toPath(p),
        start: { x: p[0], y: p[1] },
        end: { x: p[p.length - 2], y: p[p.length - 1] },
      };
    });
  });

  constructor() {
    // Browser only: prerender never fetches, so the records are never part of the static HTML.
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
}
