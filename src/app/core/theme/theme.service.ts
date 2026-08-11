import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly darkSignal = signal(false);
  readonly isDark = this.darkSignal.asReadonly();

  toggle(): void {
    this.set(!this.darkSignal());
  }

  set(dark: boolean): void {
    this.darkSignal.set(dark);
    document.documentElement.dataset['theme'] = dark ? 'dark' : 'light';
  }
}
