import { DestroyRef, Injectable, PLATFORM_ID, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { DOCK_APPS } from '../dock-apps/dock-apps.data';
import { SeoService } from '../seo/seo.service';
import { APP_ROUTE_SLUGS, appIdForPath } from './app-routes.data';
import { WindowManagerService } from './window-manager.service';
import { AppId, WindowState } from './window.model';

interface PushedWindowState {
  windowId: string;
}

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
  // Ids of windows pushed as their own history entry, in push order (most recent last).
  // #onPopState pops from here to figure out exactly which windows a given back/forward
  // traversal needs to undo, however many steps it crosses at once. Every entry this service
  // creates or revisits — push or replace — carries its own resolved windowId in `state`, so
  // a stale entry (e.g. one whose window was closed and later reopened under a fresh id) only
  // ever costs one extra close; #onPopState re-stamps it as soon as it's resolved.
  readonly #pushStack: string[] = [];
  #hasEverHadWindow = false;

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

  /**
   * Tells this service which app the URL already reflects, before its own frontmost effect
   * has run even once. Must be called synchronously from App's constructor, right after it
   * resolves the initial appId — see the call site for why (the effect's first run can land
   * in the pre-boot gap where frontmost() is still null).
   */
  seedInitialAppId(appId: AppId): void {
    this.#lastSyncedAppId = appId;
  }

  #syncUrlToFrontmost(front: WindowState | null): void {
    if (front === null && !this.#hasEverHadWindow) {
      // App hasn't opened the initial window yet (still playing the boot animation) — this
      // is not a real "the last window was closed" transition, nothing has opened at all yet.
      return;
    }
    if (front) this.#hasEverHadWindow = true;

    const appId = front?.appId ?? 'about';

    // Compute novelty against the CURRENT set before mutating it, then register the id
    // unconditionally — even a window this method decides not to navigate for (because
    // #onPopState or App's own seed already covers it) still needs to be known, or a later,
    // ordinary refocus of that same window would be misclassified as a brand-new push.
    const isPush = front !== null && !this.#knownWindowIds.has(front.id);
    if (front) this.#knownWindowIds.add(front.id);

    if (appId === this.#lastSyncedAppId) {
      // Already reflects this app — either App's own seed already covered this window's
      // first appearance, or #onPopState already drove this exact transition itself.
      return;
    }

    const slug = APP_ROUTE_SLUGS[appId] ?? '';
    this.#lastSyncedAppId = appId;
    this.#seo.applyForRoute(appId);

    // Every entry this service creates carries its own resolved windowId (or none, for the
    // 'about'/no-window case) — the push branch anchors a *new* entry to it; the replace
    // branch re-anchors the *current* entry, so a background window closing (a replace, not
    // a push) doesn't silently strip the windowId a later back/forward needs to read.
    const state: PushedWindowState | undefined = front ? { windowId: front.id } : undefined;
    if (isPush && front) {
      this.#pushStack.push(front.id);
      void this.#router.navigate([`/${slug}`], { state });
    } else {
      void this.#router.navigate([`/${slug}`], { replaceUrl: true, state });
    }
  }

  #onPopState(): void {
    const appId = appIdForPath(window.location.pathname) ?? 'about';
    const targetWindowId = (window.history.state as Partial<PushedWindowState> | null)?.windowId;

    // Undo every pushed window more recent than the entry we've landed on — this is what
    // makes going back N steps at once (not just one) correctly close all N windows that
    // were opened since, not just the single most recent one.
    while (
      this.#pushStack.length > 0 &&
      this.#pushStack[this.#pushStack.length - 1] !== targetWindowId
    ) {
      const id = this.#pushStack.pop();
      if (id && this.#windowManager.windows().some((w) => w.id === id)) {
        this.#windowManager.close(id);
      }
    }

    const existing = this.#windowManager.windows().find((w) => w.appId === appId);
    const needsOpen = appId !== 'about' && !existing;
    const needsFocus = !!existing && this.#windowManager.frontmost()?.id !== existing.id;

    this.#lastSyncedAppId = appId;

    let resolvedWindowId: string | undefined;
    if (needsOpen) {
      const titleKey = DOCK_APPS.find((app) => app.id === appId)?.labelKey;
      if (titleKey) {
        this.#windowManager.open(appId, titleKey);
        // Keep #syncUrlToFrontmost's own bookkeeping consistent regardless of which method
        // ends up creating a window, so a later, unrelated refocus of this same window isn't
        // misclassified as a brand-new open, and so a further back-press can undo it too.
        const opened = this.#windowManager.windows().find((w) => w.appId === appId);
        if (opened) {
          this.#knownWindowIds.add(opened.id);
          this.#pushStack.push(opened.id);
          resolvedWindowId = opened.id;
        }
      }
    } else if (needsFocus && existing) {
      this.#windowManager.restore(existing.id);
      this.#windowManager.focus(existing.id);
      resolvedWindowId = existing.id;
    } else if (existing) {
      resolvedWindowId = existing.id;
    }

    // Self-healing re-anchor: if the entry we landed on named a stale/dead windowId (e.g. a
    // window that was closed and later reopened under a fresh id), the loop above only ever
    // over-closes once — stamping the entry with the id that's actually live now means a
    // later revisit of this same entry reads a correct anchor instead of the stale one.
    if (resolvedWindowId !== targetWindowId) {
      const state: PushedWindowState | null = resolvedWindowId
        ? { windowId: resolvedWindowId }
        : null;
      window.history.replaceState(state, '', window.location.href);
    }

    this.#seo.applyForRoute(appId);
  }
}
