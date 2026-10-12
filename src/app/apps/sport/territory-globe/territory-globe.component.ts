import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { MultiLineString, MultiPolygon } from 'geojson';
import { I18nService } from '../../../core/i18n/i18n.service';
import { injectChartSize } from '../chart-size/chart-size';
import { GlobeLayer, GlobePiece } from './globe-world';

export interface GlobeCell {
  /** [south, west, north, east] in degrees. */
  bounds: [number, number, number, number];
  count: number;
}

interface View {
  /** [longitude, latitude] at the center of the disc. */
  center: [number, number];
  /** Scale relative to the whole globe fitting the box. */
  zoom: number;
}

/** Prerender size, and the floor below which the globe scrolls instead of squashing. */
const FALLBACK = { width: 640, height: 420 };
const EARTH_RADIUS_KM = 6371;
const MIN_ZOOM = 0.9;
const MAX_ZOOM = 160;
/** Fitting never zooms closer than this radius around the territory, so a lone cell keeps context. */
const MIN_FIT_RADIUS_KM = 90;
/** From this zoom on, the 50m outlines replace the 110m ones (if loaded). */
const FINE_ZOOM = 5;
/** Activity count lower bounds of the four glow levels. */
const LEVELS = [1, 2, 4, 10];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const DEG = 180 / Math.PI;

/** Cell as a d3 spherical ring: d3-geo wants exterior rings clockwise, i.e. W-S, W-N, E-N, E-S. */
function ring([s, w, n, e]: GlobeCell['bounds']): Array<Array<[number, number]>> {
  return [
    [
      [w, s],
      [w, n],
      [e, n],
      [e, s],
      [w, s],
    ],
  ];
}

/** Center and zoom that frame every cell, from the cells' mean center and angular spread. */
function fit(cells: readonly GlobeCell[]): View {
  if (cells.length === 0) return { center: [0, 20], zoom: 1 };
  const centers = cells.map(
    ({ bounds: [s, w, n, e] }) => [(w + e) / 2, (s + n) / 2] as [number, number],
  );
  const center: [number, number] = [
    centers.reduce((a, c) => a + c[0], 0) / centers.length,
    centers.reduce((a, c) => a + c[1], 0) / centers.length,
  ];
  const spread = Math.max(
    MIN_FIT_RADIUS_KM / EARTH_RADIUS_KM,
    ...cells.flatMap(({ bounds: [s, w, n, e] }) =>
      [
        [w, s],
        [e, n],
      ].map((p) => geoDistance(center, p as [number, number])),
    ),
  );
  // On an orthographic globe a point at angle θ from the center sits sin θ radii away.
  const zoom = 0.85 / Math.sin(Math.min(spread, Math.PI / 2));
  return { center, zoom: clamp(zoom, 1, MAX_ZOOM) };
}

@Component({
  selector: 'app-sport-territory-globe',
  templateUrl: './territory-globe.component.html',
  styleUrl: './territory-globe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerritoryGlobeComponent {
  readonly #reducedMotion =
    isPlatformBrowser(inject(PLATFORM_ID)) &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  protected readonly i18n = inject(I18nService);

  readonly cells = input.required<readonly GlobeCell[]>();
  /** Whole-globe detail, always available. */
  readonly coarse = input.required<GlobeLayer>();
  /** Close-up detail, used once zoomed in and loaded. */
  readonly fine = input<GlobeLayer | null>(null);
  readonly color = input.required<string>();

  readonly #size = injectChartSize(FALLBACK);
  protected readonly width = computed(() => this.#size().width);
  protected readonly height = computed(() => Math.max(260, this.#size().height));

  readonly #view = signal<View>({ center: [0, 20], zoom: 1 });
  /** While a finger or the mouse holds the globe, the blur glow is dropped to keep dragging smooth. */
  readonly #dragging = signal(false);
  protected readonly dragging = this.#dragging.asReadonly();
  readonly #pointers = new Map<number, { x: number; y: number }>();
  #frame = 0;
  #introduced = false;

  readonly #radius = computed(() => Math.min(this.width(), this.height()) / 2 - 6);
  readonly #projection = computed(() => {
    const { center, zoom } = this.#view();
    return geoOrthographic()
      .rotate([-center[0], -center[1]])
      .scale(this.#radius() * zoom)
      .translate([this.width() / 2, this.height() / 2])
      .clipAngle(90)
      .clipExtent([
        [0, 0],
        [this.width(), this.height()],
      ])
      .precision(1);
  });
  readonly #path = computed(() => geoPath(this.#projection()));

  /** Only the pieces that can reach the screen: within the cap the viewport's corners span. */
  readonly #onScreen = computed(() => {
    const { center, zoom } = this.#view();
    const layer = (zoom >= FINE_ZOOM && this.fine()) || this.coarse();
    const scale = this.#radius() * zoom;
    const cap = Math.asin(Math.min(1, Math.hypot(this.width(), this.height()) / 2 / scale));
    const visible = <G>(pieces: Array<GlobePiece<G>>) =>
      pieces.filter((p) => geoDistance(center, p.center) - p.radius < cap).map((p) => p.geometry);
    return { land: visible(layer.land), borders: visible(layer.borders) };
  });

  protected readonly sphere = computed(() => this.#path()({ type: 'Sphere' }) ?? '');
  protected readonly graticule = computed(() => this.#path()(geoGraticule10()) ?? '');
  protected readonly land = computed(() => {
    const shape: MultiPolygon = {
      type: 'MultiPolygon',
      coordinates: this.#onScreen().land.map((p) => p.coordinates),
    };
    return this.#path()(shape) ?? '';
  });
  protected readonly borderPath = computed(() => {
    const shape: MultiLineString = {
      type: 'MultiLineString',
      coordinates: this.#onScreen().borders.map((l) => l.coordinates),
    };
    return this.#path()(shape) ?? '';
  });
  /** One path per glow level, so a few DOM nodes draw any number of cells. */
  protected readonly levels = computed(() => {
    const path = this.#path();
    return LEVELS.map((min, i) => {
      const max = LEVELS[i + 1] ?? Infinity;
      const shape: MultiPolygon = {
        type: 'MultiPolygon',
        coordinates: this.cells()
          .filter((c) => c.count >= min && c.count < max)
          .map((c) => ring(c.bounds)),
      };
      return { id: min, d: path(shape) ?? '', opacity: 0.45 + (0.55 * i) / (LEVELS.length - 1) };
    }).filter((l) => l.d);
  });

  constructor() {
    // First data: fly in from the whole globe. Filter changes afterwards: glide to the new fit.
    effect(() => {
      const target = fit(this.cells());
      untracked(() => {
        if (this.#introduced) {
          this.#animate(target, 900);
        } else {
          this.#introduced = true;
          this.#view.set({
            center: [target.center[0] - 70, clamp(target.center[1] - 15, -60, 60)],
            zoom: 1,
          });
          this.#animate(target, 2400);
        }
      });
    });
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.#frame));
  }

  protected zoomBy(factor: number): void {
    const v = this.#view();
    this.#animate({ ...v, zoom: clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM) }, 300);
  }

  protected recenter(): void {
    this.#animate(fit(this.cells()), 900);
  }

  protected wholeGlobe(): void {
    this.#animate({ center: this.#view().center, zoom: 1 }, 900);
  }

  protected onWheel(event: WheelEvent): void {
    event.preventDefault();
    cancelAnimationFrame(this.#frame);
    this.#view.update((v) => ({
      ...v,
      zoom: clamp(v.zoom * Math.exp(-event.deltaY * 0.0015), MIN_ZOOM, MAX_ZOOM),
    }));
  }

  protected onPointerDown(event: PointerEvent): void {
    cancelAnimationFrame(this.#frame);
    (event.currentTarget as Element).setPointerCapture(event.pointerId);
    this.#pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    this.#dragging.set(true);
  }

  protected onPointerMove(event: PointerEvent): void {
    const previous = this.#pointers.get(event.pointerId);
    if (!previous) return;
    const current = { x: event.clientX, y: event.clientY };
    if (this.#pointers.size === 1) {
      // Drag: the point under the finger follows it (angle = arc length / scale).
      const scale = this.#radius() * this.#view().zoom;
      this.#view.update(({ center: [lng, lat], zoom }) => ({
        center: [
          lng - ((current.x - previous.x) / scale) * DEG,
          clamp(lat + ((current.y - previous.y) / scale) * DEG, -85, 85),
        ],
        zoom,
      }));
    } else if (this.#pointers.size === 2) {
      // Pinch: zoom by the change in distance between the two fingers.
      const other = [...this.#pointers].find(([id]) => id !== event.pointerId)?.[1];
      if (other) {
        const before = Math.hypot(previous.x - other.x, previous.y - other.y);
        const after = Math.hypot(current.x - other.x, current.y - other.y);
        if (before > 0) {
          this.#view.update((v) => ({
            ...v,
            zoom: clamp((v.zoom * after) / before, MIN_ZOOM, MAX_ZOOM),
          }));
        }
      }
    }
    this.#pointers.set(event.pointerId, current);
  }

  protected onPointerUp(event: PointerEvent): void {
    this.#pointers.delete(event.pointerId);
    this.#dragging.set(this.#pointers.size > 0);
  }

  /** Tweens center and zoom (zoom geometrically, so the fly-in feels even), or jumps under reduced motion. */
  #animate(target: View, duration: number): void {
    cancelAnimationFrame(this.#frame);
    if (this.#reducedMotion || typeof requestAnimationFrame === 'undefined') {
      this.#view.set(target);
      return;
    }
    const from = this.#view();
    // Shortest way round in longitude.
    const dLng = ((((target.center[0] - from.center[0]) % 360) + 540) % 360) - 180;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = easeInOutCubic(t);
      this.#view.set({
        center: [
          from.center[0] + dLng * e,
          from.center[1] + (target.center[1] - from.center[1]) * e,
        ],
        zoom: from.zoom * (target.zoom / from.zoom) ** e,
      });
      if (t < 1) this.#frame = requestAnimationFrame(step);
    };
    this.#frame = requestAnimationFrame(step);
  }
}
