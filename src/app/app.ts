import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  computed,
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
import { appIdForPath } from './core/window-manager/app-routes.data';
import { DOCK_APPS } from './core/dock-apps/dock-apps.data';
import { AppId } from './core/window-manager/window.model';
import { TranslationKey } from './core/i18n/translations';
import { CursorService } from './core/cursor/cursor.service';
import { SeoService } from './core/seo/seo.service';
import { WallpaperComponent } from './shell/wallpaper/wallpaper.component';
import { CursorComponent } from './shell/cursor/cursor.component';
import { BootPhase, BootScreenComponent } from './shell/boot-screen/boot-screen.component';
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
  readonly #windowUrlSync = inject(WindowUrlSyncService);
  readonly #seo = inject(SeoService);
  readonly #cursor = inject(CursorService);

  // Skip the boot animation in SSR/prerendered output — only the browser plays it.
  protected readonly bootPhase = signal<BootPhase>(
    isPlatformBrowser(inject(PLATFORM_ID)) ? 'loading' : 'done',
  );
  // The desktop mounts mid-animation (`revealing`), under the bloom still flying out.
  protected readonly showShell = computed(() => {
    const phase = this.bootPhase();
    return phase === 'revealing' || phase === 'done';
  });
  protected readonly wallpaperZoomed = computed(() => {
    const phase = this.bootPhase();
    return phase === 'loading' || phase === 'locked';
  });

  readonly #initialAppId: AppId;

  constructor() {
    // Resolved for its constructor side effects only: language detection/restore and the
    // `<html lang>` sync must run at bootstrap, before any shell component asks for a string.
    inject(I18nService);

    this.#initialAppId = this.#resolveInitialAppId();

    // Tell the sync service what the URL already reflects *before* its own frontmost effect
    // ever runs — client-side, that effect's first run can land in the gap between App's
    // constructor and the boot animation finishing (when frontmost() is still null), and
    // without this seed it would misread "no window open yet" as "everything got closed" and
    // rewrite a deep-linked URL back to '/'.
    this.#windowUrlSync.seedInitialAppId(this.#initialAppId);

    this.#seo.applyForRoute(this.#initialAppId);
    if (this.bootPhase() === 'done') {
      // Server/prerender: the boot screen never renders (bootPhase starts at 'done'), so nothing
      // would otherwise open this window — this is what makes each route's prerendered
      // HTML contain that app's real content instead of an empty desktop.
      this.#openInitialWindow();
    }

    // There's nothing to hover while assets load, so the cursor's normal
    // hover-detection has no signal to work with — force the loading glyph
    // for that stretch instead. From the lock prompt on, normal hover applies.
    effect(() => this.#cursor.setForcedVariant(this.bootPhase() === 'loading' ? 'loading' : null));

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

  onBootPhase(phase: BootPhase): void {
    this.bootPhase.set(phase);
    if (phase === 'revealing') {
      this.#openInitialWindow();
    }
  }

  #resolveInitialAppId(): AppId {
    return appIdForPath(this.#location.path()) ?? 'about';
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
