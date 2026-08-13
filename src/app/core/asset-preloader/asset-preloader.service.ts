import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const DOCK_ICON_FILES = [
  'notes-dark.png',
  'notes-light.png',
  'safari-dark.png',
  'safari-light.png',
  'finder-dark.png',
  'finder-light.png',
  'vscode-dark.png',
  'vscode-light.png',
  'photos-dark.png',
  'photos-light.png',
  'figma-dark.png',
  'figma-light.png',
  'youtube-dark.png',
  'youtube-light.png',
  'messages-dark.png',
  'messages-light.png',
  'terminal.png',
  'trash-dark.png',
  'trash-light.png',
];

export const WALLPAPER_URL = '/wallpaper.jpg';
const AVATAR_URL = '/memoji.jpeg';

const ASSET_URLS = [
  WALLPAPER_URL,
  AVATAR_URL,
  ...DOCK_ICON_FILES.map((file) => `/apps/${file}`),
];

@Injectable({ providedIn: 'root' })
export class AssetPreloaderService {
  readonly #platformId = inject(PLATFORM_ID);

  readonly #totalSignal = signal(ASSET_URLS.length);
  readonly #loadedSignal = signal(0);
  readonly #doneSignal = signal(false);
  readonly #wallpaperLoadedSignal = signal(false);

  readonly progress = this.#loadedSignal.asReadonly();
  readonly total = this.#totalSignal.asReadonly();
  readonly done = this.#doneSignal.asReadonly();
  readonly wallpaperLoaded = this.#wallpaperLoadedSignal.asReadonly();

  #startPromise: Promise<void> | null = null;

  preloadAll(): Promise<void> {
    if (this.#startPromise) {
      return this.#startPromise;
    }

    if (!isPlatformBrowser(this.#platformId)) {
      this.#loadedSignal.set(ASSET_URLS.length);
      this.#doneSignal.set(true);
      this.#wallpaperLoadedSignal.set(true);
      this.#startPromise = Promise.resolve();
      return this.#startPromise;
    }

    this.#startPromise = Promise.all(
      ASSET_URLS.map((url) => this.#loadOne(url)),
    ).then(() => {
      this.#doneSignal.set(true);
    });

    return this.#startPromise;
  }

  #loadOne(url: string): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      const settle = () => {
        this.#loadedSignal.update((count) => count + 1);
        if (url === WALLPAPER_URL) {
          this.#wallpaperLoadedSignal.set(true);
        }
        resolve();
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = url;
    });
  }
}
