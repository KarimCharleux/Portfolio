import { Injectable, signal } from '@angular/core';
import { TranslationKey } from '../i18n/translations';

/** An in-app level the mobile navigation bar's back button should pop before leaving the app. */
export interface MobileNavLevel {
  /** Label of the screen the back button returns to, resolved at render time. */
  backLabelKey: TranslationKey;
  back: () => void;
}

/**
 * Lets an app with its own drill-down (Sport's section list → section) drive the single iOS
 * navigation bar instead of rendering a second back button inside its content. While a level is
 * pushed, the bar's back button pops it; otherwise it returns to the home screen.
 */
@Injectable({ providedIn: 'root' })
export class MobileNavService {
  readonly #levelSignal = signal<MobileNavLevel | null>(null);
  readonly level = this.#levelSignal.asReadonly();

  push(level: MobileNavLevel): void {
    this.#levelSignal.set(level);
  }

  clear(): void {
    this.#levelSignal.set(null);
  }
}
