import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #darkSignal = signal(false);
  readonly isDark = this.#darkSignal.asReadonly();

  toggle(): void {
    this.set(!this.#darkSignal());
  }

  set(dark: boolean): void {
    this.#darkSignal.set(dark);
    if (isPlatformBrowser(this.#platformId)) {
      document.documentElement.dataset['theme'] = dark ? 'dark' : 'light';
    }
  }
}
