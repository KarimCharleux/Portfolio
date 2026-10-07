import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  OnInit,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AssetPreloaderService } from '../../core/asset-preloader/asset-preloader.service';
import { BootChimeService } from '../../core/boot-chime/boot-chime.service';
import { BreakpointService } from '../../core/breakpoint/breakpoint.service';
import { I18nService } from '../../core/i18n/i18n.service';

/**
 * `loading` → assets preloading behind the progress bar.
 * `locked` → loaded, waiting for the visitor's click/tap/Enter (the gesture that lets the chime play).
 * `unlocking` → Aurora bloom playing over the still-blurred wallpaper.
 * `revealing` → desktop mounted underneath while the bloom finishes flying past the screen edges.
 * `done` → overlay gone.
 */
export type BootPhase = 'loading' | 'locked' | 'unlocking' | 'revealing' | 'done';

const HOLD_AT_FULL_MS = 300;
const STATIC_BOOT_ID = 'app-boot-static';

// Fake, eased ramp toward 92% (à la Apple/macOS boot bar) — the bar never
// visually reflects raw network speed, it just decelerates as it climbs.
const RAMP_TO_MS = 1600;
const RAMP_CEILING = 92;
const MAX_LOAD_MS = 6000;

// Aurora timeline (ms from unlock), tuned in a standalone prototype at half speed.
const META_OUT_MS = 520;
const AVATAR_OUT_MS = 1360;
const BLOOM_DELAY_MS = 200;
const BLOOM_MS = 4000;
const DEBLUR_DELAY_MS = 900;
const DEBLUR_MS = 3400;
const TINT_DELAY_MS = 1240;
const TINT_MS = 2000;
const REVEAL_AT_MS = 2700;
const DONE_AT_MS = BLOOM_DELAY_MS + BLOOM_MS;
const REDUCED_FADE_MS = 400;

// The chime's swell starts slightly before the bloom peaks; stretch 2 = the prototype's 0.5× speed.
const CHIME_DELAY_S = 0.26;
const CHIME_STRETCH = 2;

const EASE_OUT = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const EASE_BLOOM = 'cubic-bezier(0.3, 0.5, 0.35, 1)';
const EASE_DEBLUR = 'cubic-bezier(0.2, 0.75, 0.25, 1)';

const SCRIM_BLURRED = 'blur(48px) saturate(140%)';
const SCRIM_CLEAR = 'blur(0px) saturate(100%)';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

@Component({
  selector: 'app-boot-screen',
  templateUrl: './boot-screen.component.html',
  styleUrl: './boot-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'unlock()',
    '(document:keydown.enter)': 'unlock()',
  },
})
export class BootScreenComponent implements OnInit {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #destroyRef = inject(DestroyRef);
  readonly #injector = inject(Injector);
  readonly #preloader = inject(AssetPreloaderService);
  readonly #chime = inject(BootChimeService);
  readonly #isMobile = inject(BreakpointService).isMobile;
  readonly #i18n = inject(I18nService);

  // `viewChild` can't target a native `#field` (Angular's signal-query compiler needs a
  // class property), so the element refs are `protected` instead.
  protected readonly rootRef = viewChild.required<ElementRef<HTMLElement>>('root');
  protected readonly scrimRef = viewChild.required<ElementRef<HTMLElement>>('scrim');
  protected readonly avatarRef = viewChild.required<ElementRef<HTMLElement>>('avatar');
  protected readonly metaRef = viewChild.required<ElementRef<HTMLElement>>('meta');
  protected readonly bloomRef = viewChild.required<ElementRef<HTMLElement>>('bloom');
  protected readonly bloomCoreRef = viewChild.required<ElementRef<HTMLElement>>('bloomCore');
  protected readonly unlockButtonRef = viewChild<ElementRef<HTMLButtonElement>>('unlockButton');

  readonly phaseChange = output<BootPhase>();

  protected readonly phase = signal<BootPhase>('loading');
  protected readonly avatarFailed = signal(false);
  protected readonly progress = signal(0);
  protected readonly unlockLabel = computed(() =>
    this.#i18n.t(this.#isMobile() ? 'bootUnlockTap' : 'bootUnlockClick'),
  );

  ngOnInit(): void {
    if (!isPlatformBrowser(this.#platformId)) {
      return;
    }

    document.getElementById(STATIC_BOOT_ID)?.remove();

    let settled = false;
    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / RAMP_TO_MS, 1);
      this.progress.set(easeOutCubic(t) * RAMP_CEILING);
      if (t < 1 && !settled) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    this.#destroyRef.onDestroy(() => cancelAnimationFrame(rafId));

    const finishLoading = () => {
      if (settled) {
        return;
      }
      settled = true;
      cancelAnimationFrame(rafId);
      this.progress.set(100);
      this.#after(HOLD_AT_FULL_MS, () => this.#lock());
    };

    this.#preloader.preloadAll().then(finishLoading);
    // Safety net: never let a slow/stalled asset hold the boot screen forever.
    this.#after(MAX_LOAD_MS, finishLoading);
  }

  onAvatarError(): void {
    this.avatarFailed.set(true);
  }

  /** Bound to the whole overlay's click, the prompt button and Enter anywhere on the page. */
  unlock(): void {
    if (this.phase() !== 'locked') {
      return;
    }
    // Must run synchronously inside the gesture, or the browser keeps the AudioContext suspended.
    this.#chime.play(CHIME_DELAY_S, CHIME_STRETCH);
    this.#setPhase('unlocking');

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.#playReduced();
    } else {
      this.#playAurora();
    }
  }

  #lock(): void {
    this.#setPhase('locked');
    afterNextRender(() => this.unlockButtonRef()?.nativeElement.focus({ preventScroll: true }), {
      injector: this.#injector,
    });
  }

  #playAurora(): void {
    const avatar = this.avatarRef().nativeElement;
    const rect = avatar.getBoundingClientRect();
    for (const ref of [this.bloomRef(), this.bloomCoreRef()]) {
      ref.nativeElement.style.left = `${rect.left + rect.width / 2}px`;
      ref.nativeElement.style.top = `${rect.top + rect.height / 2}px`;
    }

    this.#animate(
      this.metaRef().nativeElement,
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(6px)' },
      ],
      META_OUT_MS,
      0,
      EASE_OUT,
    );
    this.#animate(
      avatar,
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0.93)', opacity: 1, offset: 0.3 },
        { transform: 'scale(1.22)', opacity: 0 },
      ],
      AVATAR_OUT_MS,
      0,
      'cubic-bezier(0.3, 0, 0.2, 1)',
    );
    // Color bloom: peaks around the avatar, then keeps growing until its edges are
    // well past the viewport, so the eye travels *through* it instead of watching it fade.
    this.#animate(
      this.bloomRef().nativeElement,
      [
        { transform: 'translate(-50%, -50%) scale(0.12) rotate(0deg)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.1) rotate(12deg)', opacity: 1, offset: 0.32 },
        { transform: 'translate(-50%, -50%) scale(3.4) rotate(26deg)', opacity: 0.8, offset: 0.62 },
        { transform: 'translate(-50%, -50%) scale(8) rotate(38deg)', opacity: 0 },
      ],
      BLOOM_MS,
      BLOOM_DELAY_MS,
      EASE_BLOOM,
    );
    // The white core rides the same path but switches off before the fly-through,
    // otherwise it scales into a full-screen white wash.
    this.#animate(
      this.bloomCoreRef().nativeElement,
      [
        { transform: 'translate(-50%, -50%) scale(0.12)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 1, offset: 0.32 },
        { transform: 'translate(-50%, -50%) scale(3.4)', opacity: 0, offset: 0.62 },
        { transform: 'translate(-50%, -50%) scale(8)', opacity: 0 },
      ],
      BLOOM_MS,
      BLOOM_DELAY_MS,
      EASE_BLOOM,
    );

    const scrim = this.scrimRef().nativeElement;
    this.#animate(
      scrim,
      [
        { backdropFilter: SCRIM_BLURRED, webkitBackdropFilter: SCRIM_BLURRED },
        { backdropFilter: SCRIM_CLEAR, webkitBackdropFilter: SCRIM_CLEAR },
      ],
      DEBLUR_MS,
      DEBLUR_DELAY_MS,
      EASE_DEBLUR,
    );
    this.#animate(
      scrim,
      [{ backgroundColor: 'rgb(10 10 14 / 0.4)' }, { backgroundColor: 'rgb(10 10 14 / 0)' }],
      TINT_MS,
      TINT_DELAY_MS,
      EASE_OUT,
    );

    this.#after(REVEAL_AT_MS, () => this.#setPhase('revealing'));
    this.#after(DONE_AT_MS, () => this.#setPhase('done'));
  }

  #playReduced(): void {
    this.#setPhase('revealing');
    this.#animate(
      this.rootRef().nativeElement,
      [{ opacity: 1 }, { opacity: 0 }],
      REDUCED_FADE_MS,
      0,
      'ease',
    );
    this.#after(REDUCED_FADE_MS, () => this.#setPhase('done'));
  }

  #animate(
    el: HTMLElement,
    keyframes: Keyframe[],
    duration: number,
    delay: number,
    easing: string,
  ): void {
    const animation = el.animate(keyframes, { duration, delay, easing, fill: 'both' });
    this.#destroyRef.onDestroy(() => animation.cancel());
  }

  #after(ms: number, fn: () => void): void {
    const timeout = setTimeout(fn, ms);
    this.#destroyRef.onDestroy(() => clearTimeout(timeout));
  }

  #setPhase(phase: BootPhase): void {
    this.phase.set(phase);
    this.phaseChange.emit(phase);
  }
}
