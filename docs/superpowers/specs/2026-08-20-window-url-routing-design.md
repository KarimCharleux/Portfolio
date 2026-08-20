# Window URL routing — design

## Problem

Every "app" window is currently pure client state (`WindowManagerService`). The site is one
prerendered document at `/`; Google indexes a single page regardless of which app content
exists behind it. Opening Notes, VS Code, Finder, etc. never changes the URL, so none of that
content is independently linkable, shareable, or indexable.

## Goal

Each windowed app gets a real, English-slugged, prerendered Angular route with its own
`<title>`/description/OG/canonical, so Google indexes it as a distinct page with real content
already present in the static HTML — not just a meta-tag wrapper around the same empty desktop.

## Scope

Real Angular Router routes (not just `pushState` cosmetics), prerendered per route, English
slugs, one route per windowed app. Excludes: bilingual (`/fr`/`/en`) routing — that stays the
known, separately-scoped limitation already documented in `CLAUDE.md`'s SEO section.

## Route table

One new lookup table, `core/window-manager/app-routes.data.ts`:

```ts
export const APP_ROUTE_SLUGS: Partial<Record<AppId, string>> = {
  about: '', // root — no distinct slug, unchanged boot behavior
  notes: 'about-me',
  vscode: 'projects',
  finder: 'all-projects',
  figma: 'design',
  photoshop: 'photos',
  youtube: 'videos',
  safari: 'links',
  terminal: 'terminal',
};
```

`messages` and `trash` (`noWindow: true` in `DOCK_APPS`) are absent — they never open a window,
so they never get a route. This table is the single source of truth; `app.routes.ts`, the SEO
service, and the URL sync service all derive from it (or its inverse) rather than repeating the
mapping.

`app.routes.ts` becomes:

```ts
export const routes: Routes = [
  { path: '', data: { appId: 'about' }, title: DEFAULT_TITLE },
  { path: 'about-me', data: { appId: 'notes' }, title: '<Notes SEO title>' },
  { path: 'projects', data: { appId: 'vscode' }, title: '<VS Code SEO title>' },
  { path: 'all-projects', data: { appId: 'finder' }, title: '<Finder SEO title>' },
  { path: 'design', data: { appId: 'figma' }, title: '<Figma SEO title>' },
  { path: 'photos', data: { appId: 'photoshop' }, title: '<Photoshop SEO title>' },
  { path: 'videos', data: { appId: 'youtube' }, title: '<YouTube SEO title>' },
  { path: 'links', data: { appId: 'safari' }, title: '<Safari SEO title>' },
  { path: 'terminal', data: { appId: 'terminal' }, title: '<Terminal SEO title>' },
  { path: '**', redirectTo: '' },
];
```

No `component` on any entry, and no `<router-outlet>` anywhere in the template tree. The visual
shell (`app-desktop-shell`/`app-mobile-shell`) already renders unconditionally in `app.html` and
doesn't need to change — only *which window is open* and *which meta tags are active* depend on
the route. A route with `data`/`title` and no component is valid in Angular Router: it
participates in matching, history, and the default `TitleStrategy` without rendering anything.
This keeps the change additive — the existing shell/window-manager rendering path is untouched.

`app.routes.server.ts` needs no change: its existing `{ path: '**', renderMode:
RenderMode.Prerender }` already discovers static (non-parameterized) paths straight from
`app.routes.ts` at build time. Verify this produces one `index.html` per slug in `dist/browser/`
during implementation — if it doesn't, list the paths explicitly there instead.

## Initial window on load (SSR, prerender, and client boot)

Today, `App` (`app.ts`) only opens the `'about'` window from `onBooted()`, which fires from the
boot screen's `(finished)` output. Since `booted` starts `true` whenever
`!isPlatformBrowser(...)` (i.e. on the server), the boot screen never renders server-side and
`onBooted()` never runs — so today's prerendered/SSR HTML has **no window open at all**. The
`'about'` window only appears after client-side hydration finishes the boot animation.

This is the gap that makes the new routes' prerendered HTML actually differ per page. `App`
changes to resolve the initial app once, from the matched route rather than a hardcoded id:

```ts
const initialAppId =
  (this.#router.routerState.snapshot.root.firstChild?.data['appId'] as AppId | undefined) ??
  'about';
```

- If `booted()` is already `true` at construction (server/prerender), open `initialAppId`
  immediately — this is what makes `/about-me`'s prerendered file contain the Notes window
  instead of an empty desktop.
- Otherwise, `onBooted()` opens `initialAppId` instead of the hardcoded `'about'` — same
  animation timing as today, just route-driven.

Root (`/`) keeps `appId: 'about'`, so its behavior (centered 380×540 About Portfolio window) is
byte-for-byte unchanged.

## SEO meta per route

New `core/seo/seo.service.ts`, `@Injectable({ providedIn: 'root' })`, one method:
`applyForRoute(appId: AppId): void`. Uses Angular's `Meta` and `Title` services
(`@angular/platform-browser`) plus `DOCUMENT` for the canonical `<link>` — these are universal
(SSR + browser) by design, so **no** `isPlatformBrowser` guard here; guarding them would
silently break the prerendered output, which is the one place this matters most.

New `core/seo/route-seo.data.ts`:

```ts
export const ROUTE_SEO: Partial<Record<AppId, { title: string; description: string }>> = {
  notes: { title: '…', description: '…' },
  vscode: { title: '…', description: '…' },
  // … one entry per app.routes.ts entry except 'about'
};
```

French only — the site's SSR pass has no way to know a visitor's language preference (same
limitation already called out in `CLAUDE.md`), so prerendered meta stays French, matching the
`lang="fr"` baked into `index.html`. Content: title suffixed `— Karim Charleux`, description one
sentence per app tied to its real content (Notes → about-me bio, VS Code → code projects, etc.).

`SeoService.applyForRoute` is called from `App` right alongside the initial-window resolution,
and (client-side only, via the URL sync service below) on every subsequent route change. For
`appId: 'about'` (root) it's a no-op — root keeps whatever's already hardcoded in `index.html`.
It sets: `Title.setTitle`, `Meta` `description`/`og:title`/`og:description`/`og:url`, and updates
the canonical `<link rel="canonical">` href to `https://karimagine.fr/<slug>`.

## URL sync after load (open/focus/close → URL, and back/forward → windows)

New `core/window-manager/window-url-sync.service.ts`, `@Injectable({ providedIn: 'root' })`,
browser-guarded (`isPlatformBrowser`) — this direction only matters for live user interaction,
not prerendering.

**State → URL:** an `effect()` watches `windowManager.frontmost()`. On change:

- New window (its id wasn't seen before) → `router.navigate([slug], { state: { windowId } })`
  — pushes a history entry, tagged with the window's id.
- Frontmost changed to an *already-known* window (refocus), or frontmost became `null` (last
  window closed) → `router.navigate([slug ?? ''], { replaceUrl: true })` — no new history entry.

`slug` comes from `APP_ROUTE_SLUGS[appId]`; also calls `SeoService.applyForRoute(appId)` so
client-side navigation (dock clicks, Finder links, etc.) keeps meta tags in sync the same way
the initial SSR load does.

**URL → state (back/forward):** a native `popstate` listener (`window.addEventListener`, same
idiom as `BreakpointService`'s `matchMedia` listener — no RxJS) does the reverse: reads
`location.pathname`, resolves the appId via the inverse of `APP_ROUTE_SLUGS`, and:

- Opens/focuses that window if it isn't already frontmost.
- If `event.state?.windowId` names a window that's no longer the target, closes it — this is
  what makes "back" actually feel like closing the window that was pushed, rather than just
  relabeling the URL.

Angular's own Router also reacts to `popstate` independently (for its `TitleStrategy`/internal
state) — harmless overlap, no coordination needed since neither side depends on the other's
internal state, only on `location`/`WindowManagerService`.

## Sitemap

`public/sitemap.xml` gets one `<url>` per non-empty `APP_ROUTE_SLUGS` value, `changefreq weekly`
(content here changes more often than the root), same `priority` tier below `1.0` (root stays
highest).

## Out of scope / explicitly not doing

- No `/fr`/`/en` locale routing — untouched, pre-existing known limitation.
- No route for `messages`/`trash` (`noWindow: true`).
- No visual/layout change — the desktop shell renders identically; only initial window state and
  meta tags are route-driven.
- No `.spec.ts` files (project convention — manual verification only).

## Verification plan (manual, per project convention)

- `nvm use 24 && npx ng build` — confirm `dist/browser/about-me/index.html` (and each other
  slug) exists, contains the Notes window markup, and has the right `<title>`/meta/canonical.
- `npm run dev` (or equivalent) — click each dock app, confirm URL updates, confirm back button
  closes the window and returns URL/state to the previous one, confirm refreshing on `/projects`
  boots straight into VS Code's window.
- Both `fr` and `en` client-side toggle — confirm meta doesn't fight the language toggle (SSR
  meta is French-fixed by design; only the visible in-window content re-translates, same as
  today).
- Re-run Lighthouse (desktop) after the change — confirm 100/100 a11y/SEO/best-practices holds.
