# Window URL Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every windowed app gets a real, English-slugged, prerendered Angular route (`/about-me`, `/projects`, …) with its own title/description/OG/canonical, and the URL stays in sync with whichever window is open/frontmost after load.

**Architecture:** Flat, component-less Angular routes carry only `data: { appId }` — no `<router-outlet>`, since the desktop shell already renders unconditionally and only *which window is open* + *which meta tags are active* depend on the route. `App` resolves the initial `appId` from the matched route (once, in its constructor) instead of hardcoding `'about'`, and opens that window immediately when already `booted` (the SSR/prerender case, where the boot animation never runs). A new `WindowUrlSyncService` keeps the URL, browser history, and meta tags in sync with `WindowManagerService.frontmost()` after that initial load, client-side only.

**Tech Stack:** Angular 22 Router (`provideRouter`, already wired in `app.config.ts`), `@angular/platform-browser` `Title`/`Meta` services, signals, native `popstate` listener (no RxJS).

## Global Constraints

- No NgModules, standalone is implicit. `inject()` not constructor injection. Native `#field` private syntax, never TS `private`. Signals only, no RxJS `Observable`/`Subject` anywhere in new code — this plan uses a native `popstate` listener instead of `Router.events`, matching the existing `BreakpointService`/`matchMedia` pattern.
- `ChangeDetectionStrategy.OnPush` on every component (no new components in this plan, but existing ones are untouched).
- Browser-only side effects (`window`, `navigator`) guarded with `isPlatformBrowser(inject(PLATFORM_ID))`. `Meta`/`Title`/`DOCUMENT` are **not** browser-only — they run in SSR/prerender by design and must **not** be guarded, or the prerendered HTML loses its per-route meta entirely.
- No `.spec.ts` files (project convention, `CLAUDE.md` Testing section). Every task verifies via `nvm use 24 && npx ng build` + grepping the prerendered output, `npm run lint`, and/or a manual dev-server walkthrough — never a new test file.
- `AppId` (`src/app/core/window-manager/window.model.ts`) is the single source of truth for "what apps exist." Cross-cutting per-`AppId` config is a `Partial<Record<AppId, …>>` lookup table, not branching — matches `DOCK_APPS`/`LIST_SOURCES` convention already in the codebase.
- Confirmed build output path: `dist/portfolio-angular/browser/` (verified by running `npx ng build` — the project has no custom `outputPath`, so `@angular/build:application`'s default applies). A route at `/about-me` prerenders to `dist/portfolio-angular/browser/about-me/index.html`.
- Confirmed facts used throughout (see file:line):
  - `WindowManagerService.open(appId, titleKey, options?)` — `src/app/core/window-manager/window-manager.service.ts:28`.
  - Every non-`about` window reuses its `DockAppDef.labelKey` verbatim as `titleKey` (e.g. `notes` → `'dockNotes'`) — `src/app/core/dock-apps/dock-apps.data.ts`.
  - `about` uses `titleKey: 'aboutPortfolio'`, `options: { width: 380, height: 540, centered: true }` — `src/app/app.ts:22,70`.
  - The window title is **not** rendered as visible text on the window itself (only as `aria-label` on `section.window` — `src/app/shell/window/window.component.html`). The reliable greppable marker is the topbar: `<span class="topbar__app-name">` shows the frontmost window's translated title — `src/app/shell/topbar/topbar.component.html:16`, `topbar.component.ts:55-57`.
  - `dockNotes`/`dockVscode`/`dockPhotos`/`dockFigma`/`dockYoutube`/`dockSafari`/`dockFinder`/`dockTerminal` are identical in `en`/`fr` (brand-name labels: "Notes", "VS Code", "Photos", "Figma", "YouTube", "Safari", "Finder", "Terminal"). `aboutPortfolio` differs: `fr` = "À propos de ce portfolio", `en` = "About This Portfolio". SSR/prerender always renders `fr` (no navigator access server-side, `I18nService` defaults to `'fr'`) — grep for the French strings.
  - `BreakpointService.isMobile` defaults to `signal(false)` in SSR (only flips via a browser-only `matchMedia` listener), so the desktop shell (and its topbar) is what prerenders — `src/app/core/breakpoint/breakpoint.service.ts`.
- **No em-dash (`—`) in any new copy** — reads as an AI tell, user has flagged this before. Use `·` (already used in `index.html`'s `(Angular · TypeScript)`) or plain sentence structure instead. The one exception: the `about` route's SEO entry reuses `index.html`'s *existing* title/description verbatim (not new copy), which does contain an em-dash — leave that string exactly as-is, don't "fix" it.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/app/core/window-manager/app-routes.data.ts` (new) | `AppId` ↔ URL slug lookup table + reverse lookup helper. Single source of truth consumed by routes, SEO, and URL sync. |
| `src/app/core/window-manager/route-target.component.ts` (new) | No-op component required only to satisfy Angular Router's `validateConfig` (see Task 1, Step 2) — never rendered through an outlet. |
| `src/app/app.routes.ts` (modify) | Builds the flat route list from the slug table. |
| `src/app/core/seo/route-seo.data.ts` (new) | Per-`AppId` French title/description copy. |
| `src/app/core/seo/seo.service.ts` (new) | Applies title/description/OG/canonical for a given `AppId`, via Angular's universal `Title`/`Meta`/`DOCUMENT`. |
| `src/app/app.ts` (modify) | Resolves the initial `appId` from the matched route; opens that window (immediately if already `booted`, else in `onBooted()`); applies its SEO; boots `WindowUrlSyncService`. |
| `src/app/core/window-manager/window-url-sync.service.ts` (new) | Client-side only: `frontmost()` → URL/history/meta sync (push on new window, replace on refocus/close); `popstate` → window-manager reconciliation. |
| `public/sitemap.xml` (modify) | One `<url>` per new route. |

---

## Task 1: Route slugs + real Angular routes

**Files:**
- Create: `src/app/core/window-manager/app-routes.data.ts`
- Create: `src/app/core/window-manager/route-target.component.ts`
- Modify: `src/app/app.routes.ts`

**Interfaces:**
- Produces: `APP_ROUTE_SLUGS: Partial<Record<AppId, string>>`, `appIdForSlug(slug: string): AppId | undefined` — consumed by Task 4 (`window-url-sync.service.ts`) and Task 2 (`seo.service.ts`, indirectly via `route-seo.data.ts` keys matching the same `AppId`s). `RouteTargetComponent` is consumed only by `app.routes.ts` itself, to satisfy Router validation.

- [ ] **Step 1: Create the slug lookup table**

`src/app/core/window-manager/app-routes.data.ts`:

```ts
import { AppId } from './window.model';

/**
 * Single source of truth for AppId <-> URL slug. `about` maps to '' (root) —
 * it opens automatically at boot the same way it always has, with no distinct
 * URL of its own. Apps with `noWindow: true` in DOCK_APPS (messages, trash)
 * are intentionally absent: they never open a window, so they never get a route.
 */
export const APP_ROUTE_SLUGS: Partial<Record<AppId, string>> = {
  about: '',
  notes: 'about-me',
  vscode: 'projects',
  finder: 'all-projects',
  figma: 'design',
  photoshop: 'photos',
  youtube: 'videos',
  safari: 'links',
  terminal: 'terminal',
};

export function appIdForSlug(slug: string): AppId | undefined {
  return (Object.keys(APP_ROUTE_SLUGS) as AppId[]).find(
    (appId) => APP_ROUTE_SLUGS[appId] === slug,
  );
}
```

- [ ] **Step 2: Create a no-op route target component**

**Correctness note (found while implementing — a route with only `data` is NOT
valid, do not omit this):** Angular Router's `validateConfig` requires every
route to carry one of `component`/`loadComponent`/`redirectTo`/`children`/
`loadChildren`. `ng build`'s static prerender enumeration tolerates a
route with only `data` (it reads the `Routes` array structurally), but
`ng serve`'s dev-SSR middleware constructs its own throwaway `Router` from
the same config to enumerate paths, and THAT construction runs the strict
validation — every local `ng serve` request 500s with `NG04014` without a
component on each route. Since `App` has no `<router-outlet>` (nothing ever
renders this component through an outlet — window/meta state comes from route
`data` instead, read in Task 3), it only needs to exist to satisfy that
structural check.

`src/app/core/window-manager/route-target.component.ts`:

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Every route in app.routes.ts needs a component/loadComponent/redirectTo/children to
 * satisfy Angular Router's own config validation (`ng serve`'s dev middleware constructs a
 * throwaway Router from the route config to enumerate paths, and that construction throws
 * NG04014 without one) — but none of these routes are ever rendered through an outlet (App
 * has none; the desktop shell always renders directly, and window/meta state is driven from
 * route `data` instead). This component exists only to satisfy that structural requirement.
 */
@Component({
  selector: 'app-route-target',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteTargetComponent {}
```

- [ ] **Step 3: Build the route table from the slug table**

Replace the full contents of `src/app/app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { AppId } from './core/window-manager/window.model';
import { APP_ROUTE_SLUGS } from './core/window-manager/app-routes.data';
import { RouteTargetComponent } from './core/window-manager/route-target.component';

// Every key besides 'about' comes from APP_ROUTE_SLUGS's own keys, so the
// slug is always defined — the cast just narrows past Partial's `| undefined`.
const appRoutes: Routes = (Object.keys(APP_ROUTE_SLUGS) as AppId[])
  .filter((appId) => appId !== 'about')
  .map((appId) => ({
    path: APP_ROUTE_SLUGS[appId] as string,
    component: RouteTargetComponent,
    data: { appId },
  }));

export const routes: Routes = [
  { path: '', component: RouteTargetComponent, data: { appId: 'about' } },
  ...appRoutes,
  { path: '**', redirectTo: '' },
];
```

- [ ] **Step 4: Verify the routes build and prerender**

Run: `nvm use 24 && npx ng build`

Expected: build succeeds, and the summary line reads `Prerendered 9 static routes.` (root + 8 app routes + none for the `**` redirect, which isn't a real prerenderable page). If the count differs, `app.routes.ts` has a typo in a path or the `**` catch-all is being prerendered as a literal route — investigate before continuing.

Run: `find dist/portfolio-angular/browser -maxdepth 1 -type d | sort`

Expected output includes: `about-me`, `all-projects`, `design`, `links`, `photos`, `projects`, `terminal`, `videos` (plus `apps` and other existing asset dirs). Root `index.html` stays directly under `browser/`.

- [ ] **Step 5: Verify `ng serve` also works (not just `ng build`)**

Run: `nvm use 24 && npx ng serve --port 4444` (background it or use a second terminal), then:

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4444/
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4444/about-me
```

Expected: both `200`, not `500`. If either 500s with `NG04014`, a route is still missing `component: RouteTargetComponent` — this is exactly the gap Step 2 exists to close, and `ng build` alone will NOT catch a regression here (its prerender path tolerates component-less routes; only a live `Router` construction, like `ng serve`'s dev middleware performs, enforces this).

- [ ] **Step 6: Lint**

Run: `npm run lint`

Expected: no errors (no `any`, no `private` keyword, no `rxjs` import — none of which this task introduces).

- [ ] **Step 7: Commit**

```bash
git add src/app/core/window-manager/app-routes.data.ts src/app/core/window-manager/route-target.component.ts src/app/app.routes.ts
git commit -m "feat(routing): add real routes per windowed app"
```

---

## Task 2: SEO copy + SeoService

**Files:**
- Create: `src/app/core/seo/route-seo.data.ts`
- Create: `src/app/core/seo/seo.service.ts`

**Interfaces:**
- Consumes: `AppId` (`../window-manager/window.model`), `APP_ROUTE_SLUGS` (`../window-manager/app-routes.data`, from Task 1).
- Produces: `SeoService.applyForRoute(appId: AppId): void` — consumed by Task 3 (`app.ts`) and Task 4 (`window-url-sync.service.ts`).

- [ ] **Step 1: Write the per-app SEO copy**

`src/app/core/seo/route-seo.data.ts`:

```ts
import { AppId } from '../window-manager/window.model';

export interface RouteSeoEntry {
  readonly title: string;
  readonly description: string;
}

/**
 * French only — SSR has no way to know a visitor's language preference (same
 * limitation already documented for index.html's baked-in meta), so prerendered
 * meta stays French, matching the `lang="fr"` on the document.
 */
export const ROUTE_SEO: Partial<Record<AppId, RouteSeoEntry>> = {
  about: {
    // Copied verbatim from index.html's existing <title>/description — not new
    // copy, so its em-dash is left as-is rather than rewritten.
    title: 'Karim Charleux — Développeur Full-Stack (Angular · TypeScript)',
    description:
      'Portfolio de Karim Charleux, développeur full-stack basé à Antibes, spécialisé Angular, TypeScript et design, présenté comme un bureau macOS interactif.',
  },
  notes: {
    title: 'Karim Charleux · À propos',
    description:
      "Qui est Karim Charleux, ce qu'il fait et sur quoi il travaille en ce moment, présenté dans l'app Notes de son bureau interactif.",
  },
  vscode: {
    title: 'Karim Charleux · Projets de code',
    description:
      'Les projets de développement de Karim Charleux, développeur full-stack Angular et TypeScript, présentés dans une fenêtre VS Code.',
  },
  finder: {
    title: 'Karim Charleux · Tous les projets',
    description:
      "Vue d'ensemble de tous les projets de Karim Charleux, développeur full-stack basé à Antibes, dans une fenêtre Finder.",
  },
  figma: {
    title: 'Karim Charleux · Travaux de design',
    description:
      'Aperçu des travaux de design de Karim Charleux, présenté dans une fenêtre Figma de son bureau interactif.',
  },
  photoshop: {
    title: 'Karim Charleux · Photos',
    description:
      'Photos de Karim Charleux, présentées dans une fenêtre Photoshop de son bureau interactif.',
  },
  youtube: {
    title: 'Karim Charleux · Vidéos',
    description:
      'Projets vidéo de Karim Charleux, présentés dans une fenêtre YouTube de son bureau interactif.',
  },
  safari: {
    title: 'Karim Charleux · Liens',
    description:
      'Les réseaux et liens de Karim Charleux (LinkedIn, GitHub, Instagram, YouTube), présentés dans une fenêtre Safari de son bureau interactif.',
  },
  terminal: {
    title: 'Karim Charleux · Terminal',
    description:
      'Le bureau interactif de Karim Charleux exploré depuis une fenêtre Terminal, avec ses propres commandes.',
  },
};
```

- [ ] **Step 2: Write SeoService**

`src/app/core/seo/seo.service.ts`:

```ts
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { APP_ROUTE_SLUGS } from '../window-manager/app-routes.data';
import { AppId } from '../window-manager/window.model';
import { ROUTE_SEO } from './route-seo.data';

const SITE_URL = 'https://karimagine.fr';

/**
 * Title/Meta/DOCUMENT are universal Angular services (SSR + browser) by design —
 * this must run unguarded so the *prerendered* HTML carries the right meta, which
 * is the whole point of per-route SEO.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  readonly #document = inject(DOCUMENT);
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);

  applyForRoute(appId: AppId): void {
    const entry = ROUTE_SEO[appId];
    if (!entry) return;

    this.#title.setTitle(entry.title);
    this.#meta.updateTag({ name: 'description', content: entry.description });
    this.#meta.updateTag({ property: 'og:title', content: entry.title });
    this.#meta.updateTag({ property: 'og:description', content: entry.description });

    const slug = APP_ROUTE_SLUGS[appId] ?? '';
    const url = `${SITE_URL}/${slug}`;
    this.#meta.updateTag({ property: 'og:url', content: url });
    this.#setCanonical(url);
  }

  #setCanonical(url: string): void {
    let link = this.#document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.#document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
```

- [ ] **Step 3: Verify it compiles**

Run: `nvm use 24 && npx ng build`

Expected: succeeds. `SeoService`/`ROUTE_SEO` aren't consumed anywhere yet, so no observable output changes — this step only proves the files type-check and don't break the build. Real verification happens in Task 3, once something calls `applyForRoute`.

Run: `npm run lint`

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/core/seo/route-seo.data.ts src/app/core/seo/seo.service.ts
git commit -m "feat(seo): add per-app SEO copy and SeoService"
```

---

## Task 3: Wire the initial window + SEO into App

**Files:**
- Modify: `src/app/app.ts`

**Interfaces:**
- Consumes: `Location` (`@angular/common`), `appIdForSlug` (`./core/window-manager/app-routes.data`, from Task 1), `SeoService.applyForRoute` (Task 2), `AppId`/`DOCK_APPS` (existing), `WindowUrlSyncService` (Step 1 below creates a no-op stub so `App` has something to inject — Task 4 replaces the stub with the real implementation, keeping every commit in this plan buildable on its own).

**Correctness note (found during implementation, already fixed below — do not reintroduce):** the first version of this task read the initial `appId` from `Router.routerState.snapshot.root.firstChild?.data`, on the assumption Angular's initial navigation resolves before the root component's constructor runs. That assumption is **false** in this app's setup (default `provideRouter`, no blocking-initial-navigation feature enabled) — `Router`'s snapshot is still unresolved (`firstChild` is `null`) at `App` construction time, in both SSR and client bootstrap. The fix is to bypass `Router` for this one read and use `Location.path()` (from `@angular/common`) instead: `Location` is the primitive `PlatformLocation`-backed abstraction Router itself is built on, and it reflects the current URL (SSR request path or browser URL) synchronously and universally, with no navigation-resolution dependency. `Router` is no longer injected in `App` at all — Task 4's `WindowUrlSyncService` still uses `Router.navigate()` for later, user-driven navigation, which is unaffected by this change.

- [ ] **Step 1: Create the WindowUrlSyncService stub**

`src/app/core/window-manager/window-url-sync.service.ts`:

```ts
import { Injectable } from '@angular/core';

/** Real sync logic added in the next task — this stub exists so App can inject it now. */
@Injectable({ providedIn: 'root' })
export class WindowUrlSyncService {}
```

- [ ] **Step 2: Rewrite app.ts**

Replace the full contents of `src/app/app.ts`:

```ts
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
    const slug = this.#location.path().replace(/^\//, '');
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
```

- [ ] **Step 3: Build and verify every route's prerendered HTML**

Run: `nvm use 24 && npx ng build`

Expected: succeeds.

Run, for the root route:

```bash
grep -o '<title>[^<]*' dist/portfolio-angular/browser/index.html
grep -o 'topbar__app-name">[^<]*' dist/portfolio-angular/browser/index.html
```

Expected: title contains `Karim Charleux — Développeur Full-Stack (Angular · TypeScript)`; topbar shows `À propos de ce portfolio`.

Run, for each app route (repeat with the right slug/expected string pair):

```bash
for pair in "about-me:Notes" "projects:VS Code" "all-projects:Finder" "design:Figma" "photos:Photos" "videos:YouTube" "links:Safari" "terminal:Terminal"; do
  slug="${pair%%:*}"; expected="${pair##*:}"
  echo "== $slug (expect topbar: $expected) =="
  grep -o 'topbar__app-name">[^<]*' "dist/portfolio-angular/browser/$slug/index.html"
  grep -o '<title>[^<]*' "dist/portfolio-angular/browser/$slug/index.html"
done
```

Expected: each `topbar__app-name` matches its app's name (e.g. `about-me` → `Notes`), and each `<title>` matches the corresponding `ROUTE_SEO` entry (e.g. `about-me` → `Karim Charleux · À propos`). If a page's topbar still says the previous default or is missing, `#resolveInitialAppId` isn't resolving that route's slug correctly — check `Location.path()`'s actual return value for that build (it must equal the route's slug, e.g. `/about-me`) against `APP_ROUTE_SLUGS` in `app-routes.data.ts`.

Run: `npm run lint`

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/app.ts src/app/core/window-manager/window-url-sync.service.ts
git commit -m "feat(routing): open the matched app's window and SEO on initial load"
```

---

## Task 4: WindowUrlSyncService — real implementation

**Files:**
- Modify: `src/app/core/window-manager/window-url-sync.service.ts` (replace the Task 3 stub)

**Interfaces:**
- Consumes: `WindowManagerService.frontmost`/`windows`/`close`/`open`/`restore`/`focus` (existing), `SeoService.applyForRoute` (Task 2), `APP_ROUTE_SLUGS`/`appIdForSlug` (Task 1), `DOCK_APPS` (existing).

**Correctness notes (found across two rounds of review — the code below already has both fixes, do not revert either):**

1. An earlier version of `#onPopState` opened with `if (front?.appId === appId) return;` — an early return whenever the frontmost window's `appId` already matched the URL's resolved `appId`. That check is insufficient once more than one window can be open at a time: pushing Notes then VS Code, refocusing Notes (a `replaceUrl`, so it overwrites whichever entry currently sits on top — VS Code's — with Notes' URL, landing two adjacent history entries on the identical `/about-me` string), then pressing back once, lands on an entry whose resolved `appId` is `'notes'` — which already equals the *current* frontmost's `appId` (`'notes'`, unchanged throughout), so the guard fired and did nothing. The real desired effect of that back-press — closing the VS Code window that's still open behind Notes — never happened. Fixed by independently checking three things every time — does the tracked `#pushedWindowId` need closing, does the target app need opening, does an already-open target need focusing — rather than using appId-equality as a stand-in for "nothing to reconcile."

2. That first fix introduced a second, subtler bug: it used an `#ignoreNextFrontmostChange` boolean meant to be consumed by the next run of the `frontmost` effect. But `WindowManagerService.frontmost` is a `computed()` that reduces over window objects by `zIndex` — closing a *background* (non-frontmost) window doesn't necessarily change which object that reduction returns, and Angular's `computed()` only notifies effects on an actual value change (`Object.is`), not on every recompute. So closing VS Code while Notes stays frontmost could leave the effect never re-firing at all — meaning the flag never got consumed, stayed `true`, and silently swallowed the *next* unrelated frontmost change (e.g. the user simply clicking a different dock icon afterward), permanently desyncing the URL from the visible window until some other event happened to flip the flag back. Fixed by replacing the one-shot flag with `#lastSyncedAppId: AppId | null` — a value comparison against "which app the URL currently reflects," checked at the top of `#syncUrlToFrontmost` and updated by both that method and `#onPopState`. This is correct regardless of whether the effect fires zero, one, or more times after a given mutation, since it never depends on catching one specific effect run.

A related gap surfaced by the same review: `#onPopState`'s `existing` lookup used to be hardcoded `undefined` whenever `appId === 'about'`, so popping back to `/` never refocused an already-open-but-not-frontmost About window — the URL/title would say root/About while the screen kept showing whatever was previously frontmost. Fixed by not special-casing `'about'` out of the `existing` lookup itself (only `needsOpen` still excludes `'about'`, so a *closed* About window is never force-reopened — matching the original intent — but an already-open one is refocused like any other app).

- [ ] **Step 1: Replace the stub with the real sync logic**

`src/app/core/window-manager/window-url-sync.service.ts`:

```ts
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
```

**Post-implementation note (a final whole-branch review found more, after this task's own review already approved the code above — the checked-in file has since moved past this snippet, treat this note as authoritative over it):** the design above anchors push/undo tracking on window *instance* id (`front.id`), carried through `router.navigate`'s `state` option and read back via `window.history.state` in `#onPopState`. This turned out to have two real problems: (1) a *replace* navigation (refocus/close) passed no `state`, silently wiping the current entry's anchor, so a later Back landing there couldn't tell "nothing to undo" from "everything's stale" and over-closed windows that should have stayed untouched; (2) once a closed window is reopened it gets a fresh instance id (`WindowManagerService` never reuses one), so an entry anchored to the old id goes permanently stale — and a same-microtask "self-heal" re-stamp attempt (`window.history.replaceState`) turned out to be silently overwritten by Angular Router's own post-popstate `location.replaceState` call, so the staleness never actually healed and the destroy-and-recreate cost repeated on every revisit of that entry, not just once.

The actual fix, landed in the checked-in file: anchor on **`AppId`**, not window instance id, and drop `history.state`/the `state` navigate option entirely. `WindowManagerService.open()` already guarantees at most one window per `AppId` (it restores+focuses an existing one instead of creating a second), so an `AppId` is a durable anchor that can never go stale the way an instance id can — `#pushStack: AppId[]` replaces the single `#pushedWindowId`/instance-id stack, and `#onPopState` derives its target purely from the URL (`appIdForPath(window.location.pathname)`, already available with no extra bookkeeping) rather than from any per-entry state. A pop that finds no matching window for that appId is a harmless no-op, so the stack never needs pruning when a window closes some other way (its own traffic-light button, etc.). This is simpler than the instance-id version, not just a bug fix on top of it — read `src/app/core/window-manager/window-url-sync.service.ts` directly for the current, correct implementation rather than reconstructing it from this history.

Two residual, accepted limitations, both from the same root cause — a single linear push-stack is tracked, not a per-entry snapshot of everything that was open at that point:

- The browser **Forward** button, specifically re-entering a branch whose window was closed in the meantime, doesn't restore the full set of windows that were open at that history entry — verified interactively to not crash or loop, just lose one window's state in that specific compound sequence.
- Jumping back **multiple entries at once** (holding Back, or a long-press history menu) can stop the unwind early if an older, still-stale `AppId` happens to duplicate the jump target — self-healing on the very next Back, never stuck, never wrong beyond that one jump.

Fixing either fully would mean snapshotting the complete open-window set per history entry, a materially bigger change judged disproportionate for this site.

- [ ] **Step 2: Build and lint**

Run: `nvm use 24 && npx ng build && npm run lint`

Expected: both succeed. Prerendered output is unaffected by this task (the service no-ops on the server), so no new grep checks here — this task's behavior is inherently interactive and gets its real verification next.

- [ ] **Step 3: Manual dev-server verification**

Run: `npx ng serve` (or the project's usual dev command), open `http://localhost:4200`.

Walk through, confirming after each action:

1. Load `/` → boot animation plays, "About This Portfolio"/`À propos de ce portfolio` window opens, URL stays `/`.
2. Click the Notes dock icon → URL becomes `/about-me`, browser tab title updates to `Karim Charleux · À propos`.
3. Click the VS Code dock icon → URL becomes `/projects` (new history entry — Notes window is still open behind it, just not frontmost).
4. Click back in the dock to refocus the Notes window (click its dock icon again, or click the window itself) → URL goes back to `/about-me`, but check `history.length`/the back button: refocusing must **not** have added a new entry (replace, not push).
5. Press the browser's back button → URL returns to `/`, and the VS Code window (the one that was pushed) closes; Notes window remains open.
6. Reload directly on `/terminal` (typed URL, not client nav) → page boots straight into the Terminal window, no flash of the About window first.
7. Close the last open window via its traffic light → URL returns to `/`.

Report any step that doesn't match — don't claim success without having actually clicked through this.

- [ ] **Step 4: Commit**

```bash
git add src/app/core/window-manager/window-url-sync.service.ts
git commit -m "feat(routing): sync window state with the URL after initial load"
```

---

## Task 5: Sitemap

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Add one `<url>` per route**

Replace the full contents of `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://karimagine.fr/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/about-me</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/all-projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/design</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/photos</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/videos</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/links</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://karimagine.fr/terminal</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Verify well-formed XML**

Run: `xmllint --noout public/sitemap.xml && echo OK`

Expected: `OK`. (If `xmllint` isn't installed, `node -e "require('fs').readFileSync('public/sitemap.xml')"` combined with a visual check is an acceptable fallback — the file has no dynamic content to get wrong.)

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "chore(seo): add app routes to sitemap"
```

---

## Task 6: Final verification pass

**Files:** none (verification only).

- [ ] **Step 1: Full production build**

Run: `nvm use 24 && npx ng build`

Expected: succeeds, `Prerendered 9 static routes.`, no warnings about routes.

- [ ] **Step 2: Re-run every grep from Task 3** (confirms nothing regressed across Tasks 4–5)

Run the same loop as Task 3 Step 3, plus root. All expectations from that step still hold.

- [ ] **Step 3: EN/FR client-side toggle check**

With `npx ng serve` running, open `/about-me`, toggle language EN → FR → EN using the topbar control. Confirm: the in-window Notes content re-translates (existing behavior, unaffected by this plan), and the browser tab `<title>` stays `Karim Charleux · À propos` throughout (client-side language toggle intentionally does **not** touch SEO meta — documented limitation, not a bug).

- [ ] **Step 4: Lighthouse**

Via `chrome-devtools` MCP: `new_page` on `http://localhost:4200`, then `lighthouse_audit`. Repeat once on `/about-me` (or another app route) since it's now a distinct page.

Expected: 100/100 Accessibility/SEO/Best-Practices on both, matching the project's existing baseline (`CLAUDE.md` Accessibility section).

- [ ] **Step 5: Report**

Summarize what was actually checked (build output, grep results, manual click-through outcomes, Lighthouse scores) — not just "done."

---

## Self-Review

**Spec coverage:** route table (Task 1) · English slugs (Task 2 copy, Task 1 paths) · prerendered content per route via initial-window resolution (Task 3) · SEO meta via `SeoService` (Task 2–3) · frontmost-driven URL with push-on-open/replace-on-focus-or-close (Task 4) · popstate reconciliation closing the pushed window (Task 4) · sitemap (Task 5) · manual verification, no `.spec.ts` (Task 6, throughout) · `messages`/`trash` excluded (Task 1's table) · out-of-scope bilingual routing untouched (no task touches `I18nService`/locale routing). All spec sections have a task.

**Placeholder scan:** no TBD/TODO; all code blocks are complete, copy-pasteable files, not diffs-with-gaps.

**Type consistency:** `AppId`, `TranslationKey`, `WindowState`, `RouteSeoEntry` used identically across Tasks 1–4; `SeoService.applyForRoute(appId: AppId): void` signature matches every call site (`app.ts`, `window-url-sync.service.ts`); `APP_ROUTE_SLUGS`/`appIdForSlug` names match their Task 1 definitions everywhere they're imported.
