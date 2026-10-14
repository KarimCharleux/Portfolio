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
import { RouteShape, SPORT_KEYS, SportFilter, SportKey } from '../../../content/sport.model';
import { SPORT_LABEL_KEYS, sportColor } from '../sport-palette/sport-palette';
import { SportIconComponent, SportIconName } from '../sport-icon/sport-icon.component';

type LoadState = 'loading' | 'ready' | 'error';

type RecordKey = 'sportRecordLongest' | 'sportRecordFirst' | 'sportRecordLatest';

const RECORD_ICONS: Record<RecordKey, SportIconName> = {
  sportRecordLongest: 'trophy',
  sportRecordFirst: 'flag',
  sportRecordLatest: 'sparkles',
};

interface RecordCard {
  id: string;
  kickers: Array<{ key: RecordKey; icon: SportIconName; label: string }>;
  sport: SportKey;
  sportLabel: string;
  km: string;
  date: string;
  color: string;
  d: string;
}

function toPath(points: number[]): string {
  let d = '';
  for (let i = 0; i < points.length; i += 2) {
    d += `${i === 0 ? 'M' : 'L'}${points[i]} ${points[i + 1]}`;
  }
  return d;
}

/**
 * A trophy case of the routes that tell a story (longest per sport, first, latest): one
 * medal each, the sport icon over the route's faint trace.
 * `routes.json` is newest first, so index 0 is the latest and the last index the first.
 */
@Component({
  selector: 'app-sport-records',
  imports: [SportIconComponent],
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
        month: 'short',
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
    const held = new Map<RouteShape, RecordKey[]>();
    const hold = (route: RouteShape | undefined, key: RecordKey) => {
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
      return {
        id: `${r.date}-${r.sport}-${r.distanceKm}`,
        kickers: keys.map((key) => ({ key, icon: RECORD_ICONS[key], label: this.i18n.t(key) })),
        sport: r.sport,
        sportLabel: this.i18n.t(SPORT_LABEL_KEYS[r.sport]),
        km: this.#km().format(r.distanceKm),
        date: this.#dateFormat().format(new Date(`${r.date}T00:00:00Z`)),
        color: sportColor(r.sport),
        d: toPath(r.points),
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
