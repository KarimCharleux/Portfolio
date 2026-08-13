import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TICK_MS = 1000;

@Injectable({ providedIn: 'root' })
export class ClockService {
  readonly #nowSignal = signal(new Date());
  readonly now = this.#nowSignal.asReadonly();

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return;
    }
    const destroyRef = inject(DestroyRef);
    const id = setInterval(() => this.#nowSignal.set(new Date()), TICK_MS);
    destroyRef.onDestroy(() => clearInterval(id));
  }
}
