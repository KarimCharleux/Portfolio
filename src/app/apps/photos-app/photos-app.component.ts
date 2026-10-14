import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { Photo } from '../../content/content.model';
import { PHOTOS } from '../../content/photos.data';

/** Seconds per full loop, one per column — deliberately uneven so columns desync visually. */
const COLUMN_DURATIONS_S = [60, 68, 78, 64, 72] as const;
const COLUMN_COUNT = COLUMN_DURATIONS_S.length;
/**
 * Time constant of the velocity easing back to the ambient loop speed after a wheel/drag
 * gesture: the inertia. Also the wheel impulse divisor, so a wheel delta of N px moves the
 * content exactly N px further than the loop would have (1:1 with macOS trackpad momentum).
 */
const INERTIA_TAU_S = 0.6;
/** Pointer travel before a press becomes a drag, so a plain click still opens the lightbox. */
const DRAG_THRESHOLD_PX = 5;
/** A drag released after holding still this long throws nothing. */
const DRAG_RELEASE_STALE_MS = 80;
/** Pixels per line for `WheelEvent.DOM_DELTA_LINE` (Firefox mouse wheels). */
const WHEEL_LINE_PX = 16;

interface ColumnMotion {
  offset: number;
  velocity: number;
}

/** Wraps an offset into `(-loop, 0]`, the seamless range of the doubled track. */
function wrapOffset(offset: number, loop: number): number {
  return ((offset % loop) - loop) % loop;
}

interface PhotoColumn {
  readonly photos: readonly Photo[];
  readonly durationS: number;
  readonly reverse: boolean;
}

function buildColumns(photos: readonly Photo[]): PhotoColumn[] {
  const buckets: Photo[][] = Array.from({ length: COLUMN_COUNT }, () => []);
  photos.forEach((photo, i) => buckets[i % COLUMN_COUNT].push(photo));
  return buckets.map((bucket, i) => ({
    photos: bucket,
    durationS: COLUMN_DURATIONS_S[i],
    reverse: i % 2 === 1,
  }));
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos-app.component.html',
  styleUrl: './photos-app.component.scss',
  host: {
    '(document:keydown.escape)': 'close()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosAppComponent {
  protected readonly i18n = inject(I18nService);

  readonly #selectedPhoto = signal<Photo | null>(null);
  protected readonly selectedPhoto = this.#selectedPhoto.asReadonly();

  protected readonly columns = buildColumns(PHOTOS);

  // `viewChild` cannot target a native `#field` — Angular's signal-query compiler requires a
  // TS-visible property, so this is the one place in this class that keeps the `protected`
  // keyword instead of `#`.
  protected readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  // Same `#field` limitation as `closeButton` above.
  protected readonly masonry = viewChild.required<ElementRef<HTMLElement>>('masonry');
  protected readonly tracks = viewChildren<ElementRef<HTMLElement>>('track');

  readonly #dragging = signal(false);
  protected readonly dragging = this.#dragging.asReadonly();

  #lastFocused: HTMLElement | null = null;
  readonly #motions: ColumnMotion[] = this.columns.map(() => ({ offset: 0, velocity: 0 }));

  constructor() {
    // Moves focus into the lightbox the moment it opens (basic modal a11y) — a plain DOM call
    // rather than a template autofocus attribute, since the target only exists once
    // selectedPhoto() is truthy.
    effect(() => {
      if (this.selectedPhoto()) {
        this.closeButton()?.nativeElement.focus();
      }
    });

    // Browser-only: the scroll loop, wheel and pointer listeners all touch the DOM. Listeners
    // are attached by hand (not template bindings) so per-frame pointermove/wheel events don't
    // schedule change detection, and so wheel can be non-passive.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const teardown = this.#startScrollLoop();
      destroyRef.onDestroy(teardown);
    });
  }

  protected altFor(photo: Photo): string {
    const index = Number(photo.id.split('-')[1]);
    return `${this.i18n.t('photoAlt')} ${index}`;
  }

  protected open(photo: Photo): void {
    this.#lastFocused = document.activeElement as HTMLElement | null;
    this.#selectedPhoto.set(photo);
  }

  protected close(): void {
    this.#selectedPhoto.set(null);
    this.#lastFocused?.focus();
    this.#lastFocused = null;
  }

  // Tab lands on tiles further down a column than its `overflow: hidden` clip currently shows,
  // so the browser scrolls the column (its nearest scroll container) to bring the tile into
  // view — permanently desyncing it from the CSS transform loop, since the loop never resets
  // scrollTop. Reset it every time a tile inside the column receives focus.
  protected onColumnFocusIn(event: FocusEvent): void {
    (event.currentTarget as HTMLElement).scrollTop = 0;
  }

  /**
   * Drives every column's translateY from one rAF loop. Each column has its own velocity that
   * eases (time constant `INERTIA_TAU_S`) toward its ambient loop speed: a wheel or drag fling
   * kicks the velocity, which then decays like inertia and blends straight back into the
   * ambient scroll once it runs out. Returns the teardown.
   */
  #startScrollLoop(): () => void {
    const masonry = this.masonry().nativeElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Masonry's column gap is the same --photos-gap the tracks use between tiles.
    const gap = parseFloat(getComputedStyle(masonry).columnGap) || 0;
    let frame = 0;
    let lastFrame = performance.now();

    const tick = (now: number): void => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      const easing = 1 - Math.exp(-dt / INERTIA_TAU_S);
      const dragging = this.#dragging();

      this.tracks().forEach(({ nativeElement: track }, i) => {
        const motion = this.#motions[i];
        // The doubled list has 2n items but 2n-1 gaps, so one copy plus its trailing gap is
        // half of (height + gap).
        const loop = (track.offsetHeight + gap) / 2;
        if (loop <= 0) return; // column hidden by the container query

        if (!dragging) {
          const column = this.columns[i];
          // Keyboard focus inside a column holds it still so the focused tile can be read.
          const paused = reducedMotion || track.matches(':focus-within');
          const target = paused ? 0 : ((column.reverse ? 1 : -1) * loop) / column.durationS;
          motion.velocity += (target - motion.velocity) * easing;
          motion.offset += motion.velocity * dt;
        }
        motion.offset = wrapOffset(motion.offset, loop);
        track.style.transform = `translate3d(0, ${motion.offset}px, 0)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onWheel = (event: WheelEvent): void => {
      event.preventDefault();
      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? WHEEL_LINE_PX
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? masonry.clientHeight
            : 1;
      const impulse = (event.deltaY * unit) / INERTIA_TAU_S;
      for (const motion of this.#motions) motion.velocity -= impulse;
    };

    let pointerId: number | null = null;
    let startY = 0;
    let lastY = 0;
    let lastMoveTime = 0;
    let dragVelocity = 0;
    let suppressClick = false;

    const onPointerDown = (event: PointerEvent): void => {
      if (event.button !== 0) return;
      pointerId = event.pointerId;
      startY = lastY = event.clientY;
      lastMoveTime = event.timeStamp;
      dragVelocity = 0;
      suppressClick = false;
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (event.pointerId !== pointerId) return;
      if (!this.#dragging()) {
        if (Math.abs(event.clientY - startY) < DRAG_THRESHOLD_PX) return;
        this.#dragging.set(true);
        masonry.setPointerCapture(event.pointerId);
      }
      const dy = event.clientY - lastY;
      const dtMs = Math.max(event.timeStamp - lastMoveTime, 1);
      // Smoothed so one jittery sample doesn't decide the throw.
      dragVelocity = dragVelocity * 0.2 + (dy / dtMs) * 1000 * 0.8;
      lastY = event.clientY;
      lastMoveTime = event.timeStamp;
      for (const motion of this.#motions) {
        motion.offset += dy;
        motion.velocity = dragVelocity;
      }
    };

    const onPointerEnd = (event: PointerEvent): void => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      if (!this.#dragging()) return;
      this.#dragging.set(false);
      suppressClick = true;
      const throwVelocity =
        event.timeStamp - lastMoveTime > DRAG_RELEASE_STALE_MS ? 0 : dragVelocity;
      for (const motion of this.#motions) motion.velocity = throwVelocity;
    };

    // Capture phase: a drag that ends over a tile must not also open it.
    const onClickCapture = (event: MouseEvent): void => {
      if (!suppressClick) return;
      suppressClick = false;
      event.stopPropagation();
      event.preventDefault();
    };

    // Native image drag would hijack the pointer stream mid-gesture.
    const onDragStart = (event: DragEvent): void => event.preventDefault();

    masonry.addEventListener('wheel', onWheel, { passive: false });
    masonry.addEventListener('pointerdown', onPointerDown);
    masonry.addEventListener('pointermove', onPointerMove);
    masonry.addEventListener('pointerup', onPointerEnd);
    masonry.addEventListener('pointercancel', onPointerEnd);
    masonry.addEventListener('click', onClickCapture, true);
    masonry.addEventListener('dragstart', onDragStart);

    return () => {
      cancelAnimationFrame(frame);
      masonry.removeEventListener('wheel', onWheel);
      masonry.removeEventListener('pointerdown', onPointerDown);
      masonry.removeEventListener('pointermove', onPointerMove);
      masonry.removeEventListener('pointerup', onPointerEnd);
      masonry.removeEventListener('pointercancel', onPointerEnd);
      masonry.removeEventListener('click', onClickCapture, true);
      masonry.removeEventListener('dragstart', onDragStart);
    };
  }
}
