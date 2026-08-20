import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { getFirebaseApp } from './core/firebase-app';
import { BreakpointService } from './core/breakpoint/breakpoint.service';
import { I18nService } from './core/i18n/i18n.service';
import { WindowManagerService } from './core/window-manager/window-manager.service';
import { CursorService } from './core/cursor/cursor.service';
import { WallpaperComponent } from './shell/wallpaper/wallpaper.component';
import { CursorComponent } from './shell/cursor/cursor.component';
import { BootScreenComponent } from './shell/boot-screen/boot-screen.component';
import { DesktopShellComponent } from './shell/desktop-shell/desktop-shell.component';
import { MobileShellComponent } from './shell/mobile-shell/mobile-shell.component';

const ABOUT_WINDOW_OPTIONS = { width: 380, height: 540, centered: true };

@Component({
  selector: 'app-root',
  imports: [
    WallpaperComponent,
    CursorComponent,
    BootScreenComponent,
    DesktopShellComponent,
    MobileShellComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly isMobile = inject(BreakpointService).isMobile;
  readonly #windowManager = inject(WindowManagerService);
  readonly #cursor = inject(CursorService);

  // Skip the boot animation in SSR/prerendered output — only the browser plays it.
  protected readonly booted = signal(!isPlatformBrowser(inject(PLATFORM_ID)));

  constructor() {
    // Resolved for its constructor side effects only: language detection/restore and the
    // `<html lang>` sync must run at bootstrap, before any shell component asks for a string.
    inject(I18nService);

    // There's nothing to hover during boot, so the cursor's normal
    // hover-detection has no signal to work with — force the loading glyph
    // for that stretch instead.
    effect(() => this.#cursor.setForcedVariant(this.booted() ? null : 'loading'));

    afterNextRender(async () => {
      try {
        const { getAnalytics, isSupported, logEvent } = await import('firebase/analytics');
        if (!(await isSupported())) {
          return;
        }
        const analytics = getAnalytics(getFirebaseApp());
        logEvent(analytics, 'page_view', { page_path: window.location.pathname });
      } catch (err) {
        console.error(err);
      }
    });
  }

  onBooted(): void {
    this.booted.set(true);
    this.#windowManager.open('about', 'aboutPortfolio', ABOUT_WINDOW_OPTIONS);
  }
}
