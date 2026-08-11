import { Component, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { getFirebaseApp } from './core/firebase-app';
import { BreakpointService } from './core/breakpoint/breakpoint.service';
import { I18nService } from './core/i18n/i18n.service';
import { WindowManagerService } from './core/window-manager/window-manager.service';
import { WallpaperComponent } from './shell/wallpaper/wallpaper.component';
import { BootScreenComponent } from './shell/boot-screen/boot-screen.component';
import { DesktopShellComponent } from './shell/desktop-shell/desktop-shell.component';
import { MobileShellComponent } from './shell/mobile-shell/mobile-shell.component';

const ABOUT_WINDOW_SIZE = { width: 620, height: 360 };

@Component({
  selector: 'app-root',
  imports: [WallpaperComponent, BootScreenComponent, DesktopShellComponent, MobileShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isMobile = inject(BreakpointService).isMobile;
  private readonly i18n = inject(I18nService);
  private readonly windowManager = inject(WindowManagerService);

  // Skip the boot animation in SSR/prerendered output — only the browser plays it.
  protected readonly booted = signal(!isPlatformBrowser(inject(PLATFORM_ID)));

  constructor() {
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
    this.windowManager.open('about', this.i18n.t('aboutPortfolio'), ABOUT_WINDOW_SIZE);
  }
}
