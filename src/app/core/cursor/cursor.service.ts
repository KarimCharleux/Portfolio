import { DestroyRef, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type CursorVariant = 'arrow' | 'pointer' | 'loading';

const SPEED_NORM_PX_PER_SEC = 900;
const SPRING_RATE = 11;
const VELOCITY_DECAY = 0.9;
// The rendered art's baked rest pose is "0 rotation". Without an offset,
// rest (0°) lands exactly on one cardinal drag direction (target ≈ 0°, so
// chasing it produces no visible lean) while the opposite direction lands
// on the ±180° discontinuity (fully visible) — a diagonal offset keeps
// every cardinal direction equally visible.
const REST_OFFSET_DEG = 45;

function normalizeDeg(deg: number): number {
  return ((((deg + 180) % 360) + 360) % 360) - 180;
}

// Hovering-for-variant can't read the `cursor` CSS property — the global
// `cursor: none !important` override that hides the native pointer (see
// styles.scss) makes every element's computed cursor "none", including ones
// styled `cursor: pointer`. Detect interactivity semantically instead.
const INTERACTIVE_SELECTOR =
  'button:not(:disabled), a[href], [role="button"], select, [contenteditable="true"]';

@Injectable({ providedIn: 'root' })
export class CursorService {
  readonly #activeSignal = signal(false);
  readonly #xSignal = signal(0);
  readonly #ySignal = signal(0);
  readonly #angleSignal = signal(0);
  readonly #hoverVariantSignal = signal<CursorVariant>('arrow');
  readonly #forcedVariantSignal = signal<CursorVariant | null>(null);
  readonly #notchRectSignal = signal<DOMRect | null>(null);
  readonly #focusedSignal = signal(true);

  readonly active = this.#activeSignal.asReadonly();
  readonly x = this.#xSignal.asReadonly();
  readonly y = this.#ySignal.asReadonly();
  readonly angle = this.#angleSignal.asReadonly();
  // False whenever the window/tab isn't focused or the real pointer has left
  // the viewport — otherwise the custom cursor is left floating at its last
  // known position, on top of whatever app the user actually switched to.
  readonly focused = this.#focusedSignal.asReadonly();
  // A forced variant (e.g. "loading" during boot) wins over whatever's
  // under the pointer — there's nothing to hover yet at that point anyway.
  readonly variant = computed(() => this.#forcedVariantSignal() ?? this.#hoverVariantSignal());

  setForcedVariant(variant: CursorVariant | null): void {
    this.#forcedVariantSignal.set(variant);
  }

  // The notch is a physical camera-cutout stand-in — the cursor must never
  // render in front of it, so the topbar reports its bounds here.
  readonly insideNotch = computed(() => {
    const rect = this.#notchRectSignal();
    if (!rect) return false;
    const px = this.#xSignal();
    const py = this.#ySignal();
    return px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom;
  });

  setNotchRect(rect: DOMRect | null): void {
    this.#notchRectSignal.set(rect);
  }

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return;
    }

    const destroyRef = inject(DestroyRef);
    const finePointer = matchMedia('(pointer: fine)');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

    const updateActive = () => {
      const active = finePointer.matches && !reducedMotion.matches;
      this.#activeSignal.set(active);
      document.body.classList.toggle('cursor-hidden', active);
    };
    updateActive();
    finePointer.addEventListener('change', updateActive);
    reducedMotion.addEventListener('change', updateActive);

    let posX = 0;
    let posY = 0;
    let velX = 0;
    let velY = 0;
    let lastMoveAt = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastMoveAt) / 1000, 1 / 240);
      velX = (event.clientX - posX) / dt;
      velY = (event.clientY - posY) / dt;
      posX = event.clientX;
      posY = event.clientY;
      lastMoveAt = now;
      this.#xSignal.set(posX);
      this.#ySignal.set(posY);
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      const hovered = target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;
      this.#hoverVariantSignal.set(hovered ? 'pointer' : 'arrow');
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });

    const onFocus = () => this.#focusedSignal.set(true);
    const onBlur = () => this.#focusedSignal.set(false);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('mouseleave', onBlur);
    document.addEventListener('mouseenter', onFocus);

    let lastFrameAt = performance.now();
    // Unbounded — unlike the raw atan2 reading, this keeps accumulating as
    // direction keeps turning, which is what lets the rendered angle (which
    // chases it via shortest path) wind up multiple full turns when the
    // pointer traces circles, while still snapping straight to it (normal
    // "lean into drag direction") when travel direction holds steady.
    let targetAngle = 0;
    let lastRawDir = 0;
    let hasRawDir = false;
    let rafId = 0;
    const tick = (now: number): void => {
      const dt = Math.min((now - lastFrameAt) / 1000, 1 / 30);
      lastFrameAt = now;

      velX *= VELOCITY_DECAY;
      velY *= VELOCITY_DECAY;
      const speed = Math.hypot(velX, velY);
      const blend = Math.min(speed / SPEED_NORM_PX_PER_SEC, 1);

      if (speed > 1) {
        // Tail lags opposite the travel direction (drag/snag feel), not into it.
        const rawDir = (Math.atan2(-velY, -velX) * 180) / Math.PI - REST_OFFSET_DEG;
        targetAngle += hasRawDir ? normalizeDeg(rawDir - lastRawDir) : 0;
        if (!hasRawDir) targetAngle = rawDir;
        lastRawDir = rawDir;
        hasRawDir = true;
      } else {
        hasRawDir = false;
      }

      let current = this.#angleSignal();
      const chaseStep = blend * (1 - Math.exp(-SPRING_RATE * dt));
      current += normalizeDeg(targetAngle - current) * chaseStep;

      // Relax toward the nearest rest-orientation equivalent (0 mod 360) —
      // weak while chasing a moving target, dominant once movement settles.
      const relaxStep = (1 - blend) * (1 - Math.exp(-SPRING_RATE * dt));
      current += normalizeDeg(-current) * relaxStep;

      this.#angleSignal.set(current);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    destroyRef.onDestroy(() => {
      finePointer.removeEventListener('change', updateActive);
      reducedMotion.removeEventListener('change', updateActive);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('mouseleave', onBlur);
      document.removeEventListener('mouseenter', onFocus);
      document.body.classList.remove('cursor-hidden');
      cancelAnimationFrame(rafId);
    });
  }
}
