import { DestroyRef, Injectable, PLATFORM_ID, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { DOCK_APPS } from '../dock-apps/dock-apps.data';
import { SeoService } from '../seo/seo.service';
import { APP_ROUTE_SLUGS, appIdForSlug } from './app-routes.data';
import { WindowManagerService } from './window-manager.service';
import { WindowState } from './window.model';

/**
 * Client-side only (browser-guarded): this direction of sync only matters for live
 * user interaction, not prerendering — the initial load's window/meta are already
 * handled by App itself, from route data.
 */
@Injectable({ providedIn: 'root' })
export class WindowUrlSyncService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #router = inject(Router);
  readonly #windowManager = inject(WindowManagerService);
  readonly #seo = inject(SeoService);

  readonly #knownWindowIds = new Set<string>();
  #hasSyncedOnce = false;
  #ignoreNextFrontmostChange = false;
  #pushedWindowId: string | null = null;

  constructor() {
    if (!isPlatformBrowser(this.#platformId)) return;

    effect(() => {
      const front = this.#windowManager.frontmost();
      if (this.#ignoreNextFrontmostChange) {
        this.#ignoreNextFrontmostChange = false;
        return;
      }
      this.#syncUrlToFrontmost(front);
    });

    const onPopState = () => this.#onPopState();
    window.addEventListener('popstate', onPopState);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('popstate', onPopState));
  }

  #syncUrlToFrontmost(front: WindowState | null): void {
    const appId = front?.appId ?? 'about';
    const slug = APP_ROUTE_SLUGS[appId] ?? '';

    // The very first run just mirrors whatever window App already opened for the
    // current URL — never push a redundant history entry for it, only replace.
    const isFirst = !this.#hasSyncedOnce;
    this.#hasSyncedOnce = true;

    const isNewWindow = front !== null && !this.#knownWindowIds.has(front.id);
    const isPush = !isFirst && isNewWindow;
    if (front) {
      this.#knownWindowIds.add(front.id);
      if (isPush) this.#pushedWindowId = front.id;
    }

    this.#seo.applyForRoute(appId);
    void this.#router.navigate([`/${slug}`], { replaceUrl: !isPush });
  }

  #onPopState(): void {
    const slug = window.location.pathname.replace(/^\//, '');
    const appId = appIdForSlug(slug) ?? 'about';

    // Independent of whether the frontmost app already matches: the pushed window (if any)
    // might be a *background* window that's no longer the target and still needs closing,
    // even when frontmost itself never changed appId across this navigation.
    const pushedStillOpen = this.#pushedWindowId
      ? this.#windowManager.windows().find((w) => w.id === this.#pushedWindowId)
      : undefined;
    const shouldClosePushed = !!pushedStillOpen && pushedStillOpen.appId !== appId;

    const existing =
      appId === 'about' ? undefined : this.#windowManager.windows().find((w) => w.appId === appId);
    const needsOpen = appId !== 'about' && !existing;
    const needsFocus = !!existing && this.#windowManager.frontmost()?.id !== existing.id;

    if (!shouldClosePushed && !needsOpen && !needsFocus) {
      // Truly nothing to reconcile — don't touch #ignoreNextFrontmostChange, since no
      // window-manager mutation is about to fire the frontmost effect for it to guard.
      this.#seo.applyForRoute(appId);
      return;
    }

    // Our own subsequent window-manager calls must not re-trigger the frontmost effect
    // above and push/replace another (redundant) history entry.
    this.#ignoreNextFrontmostChange = true;

    if (shouldClosePushed && pushedStillOpen) {
      this.#windowManager.close(pushedStillOpen.id);
      this.#pushedWindowId = null;
    }
    if (needsOpen) {
      const titleKey = DOCK_APPS.find((app) => app.id === appId)?.labelKey;
      if (titleKey) this.#windowManager.open(appId, titleKey);
    } else if (needsFocus && existing) {
      this.#windowManager.restore(existing.id);
      this.#windowManager.focus(existing.id);
    }

    this.#seo.applyForRoute(appId);
  }
}
