import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { geoBounds, geoContains } from 'd3-geo';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SPORT_KEYS, SportFilter, Territory } from '../../../content/sport.model';
import { sportColor } from '../sport-palette/sport-palette';
import { GlobeCell, TerritoryGlobeComponent } from '../territory-globe/territory-globe.component';
import { CountriesTopology, GlobeLayer, toGlobeLayer } from '../territory-globe/globe-world';

type LoadState = 'loading' | 'pending' | 'ready' | 'error';

/** Land area of the Earth, km². */
const EARTH_LAND_KM2 = 148_940_000;

/**
 * The "unlocked territory" view: key figures over a globe where every grid cell crossed on an
 * outdoor activity lights up. The cells come from the Strava pipeline (`territory.json`); the
 * world outlines are world-atlas's 110m (whole globe) and 50m (close-up) countries, copied to
 * `/sport/` at build time. The 50m file is ~750 kB, so it loads after the globe is up.
 */
@Component({
  selector: 'app-sport-territory',
  imports: [TerritoryGlobeComponent],
  templateUrl: './territory.component.html',
  styleUrl: './territory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerritoryComponent {
  protected readonly i18n = inject(I18nService);

  readonly sport = input.required<SportFilter>();

  readonly #state = signal<LoadState>('loading');
  protected readonly state = this.#state.asReadonly();
  readonly #territory = signal<Territory | null>(null);
  readonly #coarse = signal<GlobeLayer | null>(null);
  protected readonly coarse = this.#coarse.asReadonly();
  readonly #fine = signal<GlobeLayer | null>(null);
  protected readonly fine = this.#fine.asReadonly();

  /** Country id of each cell's center (same order as `territory.cells`), resolved once. */
  readonly #cellCountries = computed(() => {
    const territory = this.#territory();
    const layer = this.#fine() ?? this.#coarse();
    if (!territory || !layer) return [];
    const boxes = layer.countries.map((f) => ({ f, box: geoBounds(f) }));
    return territory.cells.map(({ bounds: [s, w, n, e] }) => {
      const lng = (w + e) / 2;
      const lat = (s + n) / 2;
      const hit = boxes.find(
        ({ f, box: [[x0, y0], [x1, y1]] }) =>
          lat >= y0 &&
          lat <= y1 &&
          (x0 <= x1 ? lng >= x0 && lng <= x1 : lng >= x0 || lng <= x1) &&
          geoContains(f, [lng, lat]),
      );
      return hit ? String(hit.f.id) : null;
    });
  });

  /** Cells the current filter has crossed, with that filter's activity count. */
  readonly #visible = computed(() => {
    const territory = this.#territory();
    if (!territory) return [];
    const s = this.sport();
    const index = s === 'all' ? -1 : SPORT_KEYS.indexOf(s);
    const countries = this.#cellCountries();
    return territory.cells
      .map((cell, i) => ({
        cell,
        country: countries[i] ?? null,
        count: index < 0 ? cell.counts.reduce((a, b) => a + b, 0) : cell.counts[index],
      }))
      .filter((c) => c.count > 0);
  });

  protected readonly cells = computed<GlobeCell[]>(() =>
    this.#visible().map(({ cell, count }) => ({ bounds: cell.bounds, count })),
  );
  protected readonly color = computed(() => sportColor(this.sport()));

  readonly #int = computed(() => new Intl.NumberFormat(this.i18n.locale()));
  readonly #percent = computed(
    () =>
      new Intl.NumberFormat(this.i18n.locale(), { style: 'percent', maximumSignificantDigits: 2 }),
  );

  protected readonly figures = computed(() => {
    const visible = this.#visible();
    const area = visible.reduce((sum, c) => sum + c.cell.areaKm2, 0);
    const countries = new Set(visible.map((c) => c.country).filter((c) => c !== null));
    return [
      {
        id: 'cells',
        value: this.#int().format(visible.length),
        label: this.i18n.t('sportTerritoryCells'),
      },
      { id: 'area', value: this.#int().format(area), label: this.i18n.t('sportTerritoryArea') },
      {
        id: 'countries',
        value: this.#int().format(countries.size),
        label: this.i18n.t('sportTerritoryCountries'),
      },
      {
        id: 'earth',
        value: this.#percent().format(area / EARTH_LAND_KM2),
        label: this.i18n.t('sportTerritoryEarth'),
      },
    ];
  });

  protected readonly isEmpty = computed(() => this.#visible().length === 0);

  constructor() {
    // Browser only: prerender never fetches, so the globe is never part of the static HTML.
    afterNextRender(() => {
      const json = <T>(url: string) =>
        fetch(url).then((res) => {
          if (!res.ok) throw new Error(`${url} ${res.status}`);
          return res.json() as Promise<T>;
        });
      Promise.all([
        fetch('/sport/territory.json'),
        json<CountriesTopology>('/sport/countries-110m.json'),
      ])
        .then(async ([territoryRes, coarse]) => {
          // No snapshot yet (the next Strava sync writes it). Hosting rewrites unknown paths to
          // index.html, so a missing file shows up as a non-JSON 200 rather than a 404.
          const isJson = territoryRes.headers.get('content-type')?.includes('json') ?? false;
          if (territoryRes.status === 404 || (territoryRes.ok && !isJson)) {
            this.#state.set('pending');
            return;
          }
          if (!territoryRes.ok) throw new Error(`territory.json ${territoryRes.status}`);
          this.#territory.set((await territoryRes.json()) as Territory);
          this.#coarse.set(toGlobeLayer(coarse));
          this.#state.set('ready');
          // Close-up detail is optional: on failure the globe keeps the 110m outlines.
          json<CountriesTopology>('/sport/countries-50m.json')
            .then((fine) => this.#fine.set(toGlobeLayer(fine)))
            .catch((err: unknown) => console.error(err));
        })
        .catch((err: unknown) => {
          console.error(err);
          this.#state.set('error');
        });
    });
  }
}
