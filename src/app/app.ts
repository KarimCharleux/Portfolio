import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';
import { getFirebaseApp } from './core/firebase-app';
import { BreakpointService } from './core/breakpoint/breakpoint.service';
import { I18nService } from './core/i18n/i18n.service';
import { WindowManagerService } from './core/window-manager/window-manager.service';
import { WindowUrlSyncService } from './core/window-manager/window-url-sync.service';
import { appIdForSlug } from './core/window-manager/app-routes.data';
import { DOCK_APPS } from './core/dock-apps/dock-apps.data';
import { AppId } from './core/window-manager/window.model';
import { TranslationKey } from './core/i18n/translations';
import { CursorService } from './core/cursor/cursor.service';
import { SeoService } from './core/seo/seo.service';
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
  readonly #location = inject(Location);
  readonly #windowManager = inject(WindowManagerService);
  readonly #seo = inject(SeoService);
  readonly #cursor = inject(CursorService);

  // Skip the boot animation in SSR/prerendered output — only the browser plays it.
  protected readonly booted = signal(!isPlatformBrowser(inject(PLATFORM_ID)));

  readonly #initialAppId: AppId;

  constructor() {
    // Resolved for its constructor side effects only: language detection/restore and the
    // `<html lang>` sync must run at bootstrap, before any shell component asks for a string.
    inject(I18nService);

    // Resolved for its constructor side effects only: keeps the URL, history and meta tags
    // in sync with whichever window is frontmost, for every open/focus/close after this load.
    inject(WindowUrlSyncService);

    this.#initialAppId = this.#resolveInitialAppId();
    this.#seo.applyForRoute(this.#initialAppId);
    if (this.booted()) {
      // Server/prerender: the boot screen never renders (booted starts true), so nothing
      // would otherwise open this window — this is what makes each route's prerendered
      // HTML contain that app's real content instead of an empty desktop.
      this.#openInitialWindow();
    }

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
    this.#openInitialWindow();
  }

  #resolveInitialAppId(): AppId {
    const slug = this.#location
      .path()
      .replace(/^\//, '')
      .split('?')[0]
      .split('#')[0]
      .replace(/\/$/, '');
    return appIdForSlug(slug) ?? 'about';
  }

  #openInitialWindow(): void {
    if (this.#initialAppId === 'about') {
      this.#windowManager.open('about', 'aboutPortfolio', ABOUT_WINDOW_OPTIONS);
      return;
    }
    const titleKey: TranslationKey =
      DOCK_APPS.find((app) => app.id === this.#initialAppId)?.labelKey ?? 'aboutPortfolio';
    this.#windowManager.open(this.#initialAppId, titleKey);
  }
}
