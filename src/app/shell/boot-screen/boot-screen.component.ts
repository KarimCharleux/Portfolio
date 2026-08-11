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

const PROGRESS_TICK_MS = 30;
const PROGRESS_STEP = 2.4;
const FADE_MS = 450;
const HOLD_AT_FULL_MS = 300;

@Component({
  selector: 'app-boot-screen',
  templateUrl: './boot-screen.component.html',
  styleUrl: './boot-screen.component.scss',
})
export class BootScreenComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly finished = output<void>();

  protected readonly progress = signal(0);
  protected readonly fading = signal(false);
  protected readonly avatarFailed = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const interval = setInterval(() => {
      const next = Math.min(this.progress() + PROGRESS_STEP, 100);
      this.progress.set(next);
      if (next >= 100) {
        clearInterval(interval);
        setTimeout(() => this.beginFadeOut(), HOLD_AT_FULL_MS);
      }
    }, PROGRESS_TICK_MS);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  onAvatarError(): void {
    this.avatarFailed.set(true);
  }

  private beginFadeOut(): void {
    this.fading.set(true);
    setTimeout(() => this.finished.emit(), FADE_MS);
  }
}
