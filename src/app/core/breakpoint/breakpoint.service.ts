import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const MOBILE_MAX_WIDTH_PX = 767;

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private readonly isMobileSignal = signal(false);
  readonly isMobile = this.isMobileSignal.asReadonly();

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return;
    }
    const destroyRef = inject(DestroyRef);
    const mql = matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    this.isMobileSignal.set(mql.matches);
    const listener = (event: MediaQueryListEvent) => this.isMobileSignal.set(event.matches);
    mql.addEventListener('change', listener);
    destroyRef.onDestroy(() => mql.removeEventListener('change', listener));
  }
}
