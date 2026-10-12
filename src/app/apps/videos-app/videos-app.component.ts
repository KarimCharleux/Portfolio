import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import {
  YOUTUBE_VIDEOS,
  youtubeClipSrc,
  youtubePosterSrc,
  youtubeWatchUrl,
} from '../../content/youtube-videos.data';

/** Advance anyway if a clip has not started after this long (autoplay refused, poster shown). */
const FALLBACK_ADVANCE_MS = 6000;

@Component({
  selector: 'app-videos',
  templateUrl: './videos-app.component.html',
  styleUrl: './videos-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosAppComponent {
  readonly #destroyRef = inject(DestroyRef);
  protected readonly i18n = inject(I18nService);

  protected readonly videos = YOUTUBE_VIDEOS;
  protected readonly clipSrc = youtubeClipSrc;
  protected readonly posterSrc = youtubePosterSrc;
  protected readonly watchUrl = youtubeWatchUrl;

  readonly #current = signal(0);
  protected readonly current = this.#current.asReadonly();
  readonly #paused = signal(false);
  protected readonly paused = this.#paused.asReadonly();
  /** 0..1 progress of the current clip. */
  readonly #progress = signal(0);
  protected readonly progress = this.#progress.asReadonly();
  /** Playback only starts once the view exists in a browser; the prerendered HTML is posters only. */
  readonly #ready = signal(false);

  // `viewChildren` cannot target a native `#field` (Angular's signal-query compiler needs a
  // TS-visible property), so this query keeps the `protected` keyword.
  protected readonly players = viewChildren<ElementRef<HTMLVideoElement>>('player');

  protected readonly video = computed(() => this.videos[this.current()]);
  protected readonly indexLabel = computed(() => String(this.current() + 1).padStart(2, '0'));
  protected readonly meta = computed(() => {
    const video = this.video();
    const locale = this.i18n.locale();
    // `publishedAt` is a calendar date: format it in UTC so no timezone shifts it a day back.
    const date = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
      new Date(video.publishedAt),
    );
    const views = new Intl.NumberFormat(locale).format(video.views);
    return `${date} · ${views} ${this.i18n.t('videosViews')}`;
  });

  #shownIndex = -1;
  #fallbackTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.#paused.set(true);
      }
      this.#ready.set(true);
    });

    effect(() => {
      if (!this.#ready()) return;
      this.#sync(this.current(), this.paused(), this.players());
    });

    this.#destroyRef.onDestroy(() => {
      clearTimeout(this.#fallbackTimer);
      this.players().forEach(({ nativeElement }) => nativeElement.pause());
    });
  }

  protected barFill(index: number): number {
    if (index < this.current()) return 1;
    return index === this.current() ? this.progress() : 0;
  }

  protected goTo(index: number): void {
    this.#current.set(index);
  }

  protected togglePause(): void {
    this.#paused.update((paused) => !paused);
  }

  protected onTimeUpdate(index: number, player: HTMLVideoElement): void {
    if (index !== this.current() || !player.duration) return;
    this.#progress.set(player.currentTime / player.duration);
  }

  protected onEnded(index: number): void {
    if (index === this.current() && !this.paused()) this.#advance();
  }

  #advance(): void {
    this.#current.update((index) => (index + 1) % this.videos.length);
  }

  #sync(
    index: number,
    paused: boolean,
    players: ReadonlyArray<ElementRef<HTMLVideoElement>>,
  ): void {
    clearTimeout(this.#fallbackTimer);
    const changed = index !== this.#shownIndex;
    this.#shownIndex = index;
    if (changed) this.#progress.set(0);

    players.forEach(({ nativeElement: player }, i) => {
      // The `muted` attribute alone does not satisfy Chrome's autoplay policy: set the property.
      player.muted = true;
      if (i !== index) {
        player.pause();
        return;
      }
      if (changed) player.currentTime = 0;
      if (paused) {
        player.pause();
      } else {
        player.play().catch(() => undefined);
      }
    });

    const next = players[(index + 1) % players.length]?.nativeElement;
    if (next) next.preload = 'auto';

    if (!paused) {
      this.#fallbackTimer = setTimeout(() => {
        const player = players[index]?.nativeElement;
        if (this.current() === index && !this.paused() && (!player || player.currentTime === 0)) {
          this.#advance();
        }
      }, FALLBACK_ADVANCE_MS);
    }
  }
}
