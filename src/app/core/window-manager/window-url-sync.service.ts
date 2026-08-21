import { DestroyRef, Injectable, PLATFORM_ID, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { DOCK_APPS } from '../dock-apps/dock-apps.data';
import { SeoService } from '../seo/seo.service';
import { APP_ROUTE_SLUGS, appIdForSlug } from './app-routes.data';
import { WindowManagerService } from './window-manager.service';
import { AppId, WindowState } from './window.model';

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
  #pushedWindowId: string | null = null;

  // Tracks which app the URL/title/meta currently reflect. A value comparison rather than a
  // one-shot "ignore the next change" flag: closing a *background* window can leave
  // `frontmost()` returning the same object reference (Angular's computed() only notifies
  // consumers on an actual value change), so a flag meant to be consumed by the next effect
  // run can go unconsumed and then wrongly swallow a later, unrelated navigation. Comparing
  // against the last-synced appId works regardless of whether the effect fires zero, one, or
  // more times after a given window-manager mutation.
  #lastSyncedAppId: AppId | null = null;

  constructor() {
    if (!isPlatformBrowser(this.#platformId)) return;

    effect(() => {
      const front = this.#windowManager.frontmost();
      this.#syncUrlToFrontmost(front);
    });

    const onPopState = () => this.#onPopState();
    window.addEventListener('popstate', onPopState);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('popstate', onPopState));
  }

  #syncUrlToFrontmost(front: WindowState | null): void {
    const appId = front?.appId ?? 'about';
    if (appId === this.#lastSyncedAppId) {
      // Already reflects this app — either a no-op recompute, or #onPopState already drove
      // both window state and the URL to match this transition itself.
      return;
    }

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

    this.#lastSyncedAppId = appId;
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

    // Unlike #syncUrlToFrontmost, 'about' is not special-cased out of this lookup: if the
    // About window is still open (just not frontmost), popping back to '/' should bring it
    // forward so the visible window matches the URL/title — it just never gets force-opened
    // if it was closed (that's what `needsOpen`'s `appId !== 'about'` guards against).
    const existing = this.#windowManager.windows().find((w) => w.appId === appId);
    const needsOpen = appId !== 'about' && !existing;
    const needsFocus = !!existing && this.#windowManager.frontmost()?.id !== existing.id;

    if (!shouldClosePushed && !needsOpen && !needsFocus) {
      // Truly nothing to reconcile.
      this.#lastSyncedAppId = appId;
      this.#seo.applyForRoute(appId);
      return;
    }

    // Mark the URL as already in sync with this target before mutating window state, so
    // #syncUrlToFrontmost never tries to re-navigate for a transition this method already
    // drove — regardless of whether the frontmost effect ends up re-firing for it or not.
    this.#lastSyncedAppId = appId;

    if (shouldClosePushed && pushedStillOpen) {
      this.#windowManager.close(pushedStillOpen.id);
      this.#pushedWindowId = null;
    }
    if (needsOpen) {
      const titleKey = DOCK_APPS.find((app) => app.id === appId)?.labelKey;
      if (titleKey) {
        this.#windowManager.open(appId, titleKey);
        // Keep #syncUrlToFrontmost's own bookkeeping consistent regardless of which method
        // ends up creating a window, so a later, unrelated refocus of this same window isn't
        // misclassified as a brand-new open (and pushed) by #syncUrlToFrontmost.
        const opened = this.#windowManager.windows().find((w) => w.appId === appId);
        if (opened) {
          this.#knownWindowIds.add(opened.id);
          this.#pushedWindowId = opened.id;
        }
      }
    } else if (needsFocus && existing) {
      this.#windowManager.restore(existing.id);
      this.#windowManager.focus(existing.id);
    }

    this.#seo.applyForRoute(appId);
  }
}
