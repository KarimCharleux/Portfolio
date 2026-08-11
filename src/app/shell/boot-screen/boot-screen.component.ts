import {
  Component,
  DestroyRef,
  OnInit,
  PLATFORM_ID,
  inject,
  output,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AssetPreloaderService } from '../../core/asset-preloader/asset-preloader.service';

const FADE_MS = 450;
const HOLD_AT_FULL_MS = 300;
const STATIC_BOOT_ID = 'app-boot-static';

// Fake, eased ramp toward 92% (à la Apple/macOS boot bar) — the bar never
// visually reflects raw network speed, it just decelerates as it climbs.
const RAMP_TO_MS = 1600;
const RAMP_CEILING = 92;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

@Component({
  selector: 'app-boot-screen',
  templateUrl: './boot-screen.component.html',
  styleUrl: './boot-screen.component.scss',
})
export class BootScreenComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly preloader = inject(AssetPreloaderService);

  readonly finished = output<void>();

  protected readonly fading = signal(false);
  protected readonly avatarFailed = signal(false);
  protected readonly progress = signal(0);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
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
    this.destroyRef.onDestroy(() => cancelAnimationFrame(rafId));

    this.preloader.preloadAll().then(() => {
      settled = true;
      cancelAnimationFrame(rafId);
      this.progress.set(100);
      const timeout = setTimeout(() => this.beginFadeOut(), HOLD_AT_FULL_MS);
      this.destroyRef.onDestroy(() => clearTimeout(timeout));
    });

    // Safety net: never let a slow/stalled asset hold the boot screen forever.
    const maxWait = setTimeout(() => {
      if (!settled) {
        settled = true;
        cancelAnimationFrame(rafId);
        this.progress.set(100);
        this.beginFadeOut();
      }
    }, 6000);
    this.destroyRef.onDestroy(() => clearTimeout(maxWait));
  }

  onAvatarError(): void {
    this.avatarFailed.set(true);
  }

  private beginFadeOut(): void {
    if (this.fading()) {
      return;
    }
    this.fading.set(true);
    setTimeout(() => this.finished.emit(), FADE_MS);
  }
}
