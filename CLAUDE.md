# CLAUDE.md

**CAVEMAN MODE**: Activate `/caveman ultra` at the start of each conversation.

Karim Charleux's portfolio — a macOS-desktop-themed one-page app (menu bar, dock, real draggable/resizable window manager) with an iOS-style mobile shell. Built from a blank-slate Angular 22 rewrite; design intent lives in `docs/superpowers/specs/*.md` and the task-by-task build logs in `docs/superpowers/plans/*.md`. Read those two spec files before adding any new "app" (dock icon + window) — they define the pixel-accurate chrome constants, icon-sourcing rules and scope boundaries this project holds itself to.

## Stack

Angular 22.1.x · standalone components (default, no NgModules) · zoneless change detection · signals for all state (no RxJS) · `@angular/ssr` (prerendered, deployed static to Firebase Hosting — see README) · Vitest · SCSS · raw `firebase` SDK (not `@angular/fire` — no Angular-22-compatible release exists).

## Architecture: four layers, one direction of dependency

```
src/app/
  core/       framework-agnostic singleton services + models (DI, no templates)
  content/    plain data: TS interfaces (content.model.ts) + per-category .data.ts arrays
  apps/       "app" components rendered *inside* a window (one per dock app + about-portfolio)
  shell/      the desktop/mobile chrome itself (window, dock, topbar, wallpaper, shells)
```

`shell` depends on `core` + `apps`. `apps` depends on `core` + `content`. `core` and `content` depend on nothing else in `src/app`. Don't invert this — a `content/*.data.ts` file must never import from `apps/` or `shell/`, and `core/` services must never import a component.

Every component/service/model lives in its own directory, one concern per directory (`core/window-manager/`, `apps/app-icon/`, `shell/dock/`, …), colocated `.ts` + `.html` + `.scss` (+ `.spec.ts` — see Testing below). Don't add a second unrelated export to an existing file to save a directory; don't create a directory for something that isn't its own component/service.

## Angular 22 conventions actually used here — match these, don't improvise new ones

These are **non-negotiable**. This project holds itself to strict, current Angular 22 best practices — no Angular ≤15 patterns, no "it still works" shortcuts. Treat any of the following found in new or touched code as a bug to fix, not a style nit:

- **No NgModules, ever.** Standalone is the implicit default (Angular CLI 2025 style) — don't write `standalone: true`.
- **File naming**: `app.ts`/`app.html`/`app.config.ts`, component files as `<name>.component.ts` — never `.component.ts` suffix on the root `App`, never old Angular ≤15 `app.module.ts` style.
- **State = signals only.** `signal()`, `computed()`, `effect()` where truly needed. No RxJS `Observable`/`Subject` anywhere in this codebase — if a service needs async, prefer `afterNextRender`/`toSignal`-free patterns already established (see `BreakpointService`, `ClockService`).
- **Service shape**: `@Injectable({ providedIn: 'root' })`, a private writable `signal`, exposed as `readonly foo = this.fooSignal.asReadonly()`. Never expose a raw mutable `WritableSignal` from a service's public API.
- **DI**: `inject()` function, not constructor-parameter injection. Fields ordered private-then-protected, injected deps first.
- **Private members use native `#field` syntax** (ECMAScript private fields, TC39 Class Fields proposal, Stage 4 since 2021, shipped ES2022) — never the TypeScript `private` keyword. `private` is compile-time-only (the property still exists on the compiled JS object, accessible via bracket notation); `#field` is enforced by the JS engine itself. Applies to private fields and private methods alike: `readonly #foo = inject(Foo);`, `#bar(): void { … }`. `readonly`/`static` combine fine with `#` (`readonly #foo = …`); `public`/`protected` stay as their own keywords (no `#`) since those aren't expressible with private-field syntax.
- **Inputs**: signal `input()` / `input.required<T>()` — not the `@Input()` decorator.
- **Outputs**: the `output()` function — not the `@Output()` decorator + `EventEmitter`.
- **Queries**: signal-based `viewChild()`/`viewChildren()`/`contentChild()`/`contentChildren()` — not `@ViewChild`/`@ContentChild` decorators.
- **Host bindings/listeners**: the `host: {…}` object in `@Component`/`@Directive` metadata — not `@HostBinding`/`@HostListener` decorators.
- **Control flow**: `@if` / `@for` / `@switch` in templates — never the structural directives `*ngIf`/`*ngFor`. Every `@for` must have `track` (a stable id, never `$index` unless the list is truly index-keyed).
- **Change detection**: `ChangeDetectionStrategy.OnPush` on every component. This app is already zoneless, but `OnPush` stays required — it's what makes signal-driven views correct and keeps the mental model honest for any future non-zoneless work.
- **`@defer`** for genuinely non-critical or heavy view blocks (below-the-fold content, rarely-opened panels) — don't reach for it reflexively, but don't hand-roll lazy-loading patterns it already solves.
- **No `any`.** Use precise types, `unknown` + narrowing, or generics. If you must escape the type system, it needs a comment explaining why, not a silent `any`.
- **Browser-only side effects** (DOM, `window`, `navigator`, analytics) must be guarded with `isPlatformBrowser(inject(PLATFORM_ID))` and/or wrapped in `afterNextRender()`. This app is prerendered — anything that touches `window`/`document`/`navigator` unguarded breaks the build. See `app.ts`'s browser-language detection and `BreakpointService` for the pattern.
- **Cleanup**: `DestroyRef.onDestroy()`, not `ngOnDestroy` lifecycle hooks, for teardown in services (see `BreakpointService`).
- **Lookup tables over branching**: cross-cutting per-`AppId` config (content sources, dock metadata) is a `Partial<Record<AppId, …>>` object, not a chain of `if`/`switch` — see `app-host.component.ts`'s `LIST_SOURCES`/`GRID_SOURCES`. `AppId` (`core/window-manager/window.model.ts`) is the single source of truth for "what apps exist" — every dock entry, window, and content lookup keys off it.
- Small wrapper components (e.g. `AppHostComponent`) may use an inline `template:` when the whole thing is a few lines; anything with real markup gets its own `.html` file. Follow whichever the existing sibling components in that directory do.

## Styling

- Design tokens (`shell/design-tokens.scss`): CSS custom properties on `:root`, theme values split into `:root[data-theme='dark']` / `:root:not([data-theme='dark'])` blocks. Add new tokens there, not as magic numbers in a component's `.scss`.
- Class naming is BEM (`.window__traffic-light--zoom`, `.dock__slot--hovered`). Keep following it.
- Chrome measurements (traffic-light size, notch dimensions, menu-bar height, iOS status-bar height, …) must be sourced/verified real values, per the design spec's "pixel-accurate fidelity" constraint — never eyeballed.
- Apple-owned icon artwork (Notes/Safari/Finder/Trash/Terminal/Messages-style icons) and the wallpaper are original work inspired by the real thing — never a reproduction of an actual Apple asset. Real third-party brand marks (VS Code, Figma, YouTube) come from the `simple-icons` package, never hand-typed SVG path data.

## i18n

- Default language is **French**. `I18nService` owns the whole lifecycle: a stored choice (`localStorage`, key `portfolio.lang`) wins, else `navigator.language` (`fr*` → `fr`, anything else → `en`), else the `'fr'` signal default that matches the `lang="fr"` baked into `src/index.html`. Components never detect or persist the language themselves.
- Every user-visible string **and every `aria-label`** goes through `I18nService.t()` / `TRANSLATIONS` (`core/i18n/translations.ts`) — no hardcoded English (or French) literal in a template, including on icon-only buttons. This codebase previously shipped hardcoded-English `aria-label`s while visible text was French; don't reintroduce that.
- Adding a string: add the key to `TRANSLATIONS` with both `en` and `fr` values, consume via `i18n.t('key')`. Keys are plain English identifiers describing the string's role, not its content.
- **Never store a resolved string in state.** `WindowState.titleKey` and `DockAppDef.labelKey` are `TranslationKey`s resolved at render time; a resolved string would freeze at open time and survive a language toggle untranslated. Same rule for anything new that outlives a single render.
- App names go through the table too (`dockNotes`, `dockVscode`, …), even when both locales are identical (brand names) — one lookup path, no exceptions to reason about. Real translations do differ (`Trash` / `Corbeille`).
- `Intl` formatters take `i18n.locale()` (a BCP 47 tag from `LOCALES`) — never hand-map a `Lang` to `'fr-FR'`/`'en-US'` inside a component.
- `content/*.data.ts` builds its per-`Lang` arrays from `TRANSLATIONS`, never from inline `lang === 'fr' ? … : …` ternaries — the translation table stays the single source of truth for copy.
- `I18nService` syncs `document.documentElement.lang` on every change (platform-guarded `effect`) — a stale `<html lang>` misleads screen readers and search engines.

## SEO

- Canonical domain: `https://karimagine.fr/`. Keep `canonical`, `og:url`, the sitemap `<loc>`, and the JSON-LD `url` in sync with it.
- The whole site is one prerendered route (`RenderMode.Prerender` in `app.routes.server.ts`) — Google indexes the static HTML directly. Don't break prerendering (i.e. don't introduce a browser-only dependency that isn't platform-guarded — see Angular conventions above).
- `src/index.html` carries all SEO meta (title, description, canonical, robots, OG/Twitter cards, JSON-LD `Person`), baked in French to match the default locale.
- `public/robots.txt` + `public/sitemap.xml` are hand-maintained (single-URL site). Update the sitemap if real routes are ever added.
- JSON-LD `sameAs` mirrors the real links in `content/social-links.data.ts` — update both together.
- **Known limitation**: the FR/EN toggle is client-side only (no `/fr` `/en` routes), so Google only ever indexes the French default. True bilingual SEO needs locale-based routing — treat as a separate, larger task if ever requested, don't half-build it.

## Accessibility

- Baseline: 100/100 Lighthouse Accessibility/SEO/Best-Practices (desktop). Re-check after any UI change: `chrome-devtools` MCP → `new_page` on `http://localhost:4200` → `lighthouse_audit`.
- Every icon-only interactive element needs an `aria-label` (see traffic-light window controls, dock icons, topbar toggles).
- WCAG 2.5.3 (label-in-name): if a control shows visible text (e.g. the `EN`/`FR` toggle), its `aria-label` must contain that visible text as a substring — a purely descriptive label without it fails Lighthouse's `label-content-name-mismatch`.
- Meaningful images (the Karim Charleux avatar) get a real `alt`; purely decorative icons redundant with an already-labelled parent button keep `alt=""`.

## Testing — don't write specs unless asked

**Don't add `.spec.ts` files.** This is a deliberate, standing call by the repo owner, not debt to pay down: verification here is manual (run the app, exercise the UI in both locales, re-check Lighthouse). Don't add a spec because a file lacks one, don't add one alongside a new service/component, and don't propose a "let's add tests" pass unasked.

This overrides the TDD instruction in the original build plan (`docs/superpowers/plans/2026-08-10-macos-portfolio.md`) — that plan predates the decision. Ignore its Task-1 spec template.

`core/i18n/i18n.service.spec.ts` is the one existing spec. Leave it in place and keep it passing; it isn't a precedent to follow.

If the owner does ask for tests, the shape is Vitest + `TestBed` (`TestBed.inject`, one `it` per behavior, assert on signals directly), run with `nvm use 24 && npx ng test --watch=false` (scope with `--include <glob>`).

**Test-free doesn't mean verification-free.** What replaces a spec is actually exercising the change: load the app, click through the affected UI in `fr` _and_ `en`, confirm the production build still prerenders, and re-run the Lighthouse audit after any UI change. Report what you actually checked — never claim a change works because it compiles.

## Linting & formatting (the conventions above are enforced, not just documented)

- `eslint.config.js` (flat config, ESLint 10 + `angular-eslint` 22, type-aware via `projectService`) encodes the Angular 22 rules from this file: `prefer-standalone`, `prefer-on-push-component-change-detection`, `prefer-signals`/`prefer-signal-model`/`prefer-output-emitter-ref`, `prefer-host-metadata-property`, `prefer-inject` + `inject-at-top`, `template/prefer-control-flow`, `no-explicit-any`, plus a `no-restricted-syntax` ban on the TypeScript `private` keyword (use `#field`) and a `no-restricted-imports` ban on `rxjs`. Adding a rule here beats writing a new paragraph of prose.
- Two rules are deliberately off, both with a comment in the config: `template/prefer-ngsrc` (NgOptimizedImage migration is its own task) and `template/require-switch-default` (`AppId` includes window-only ids with no dock artwork).
- Prettier owns all formatting; `eslint-config-prettier` is last in both extends chains so no lint rule fights it. `src/index.html` is excluded from template linting — it's the static SEO shell, not an Angular template.
- `.stylelintrc.json` (`stylelint-config-standard-scss`) enforces the BEM class pattern and modern color notation. Three rules are off on purpose, each because `--fix` actively damaged real code: `property-no-vendor-prefix` (strips `-webkit-backdrop-filter`, which Safari still needs for every glass surface), `custom-property-empty-line-before` (flattens the blank-line grouping in `design-tokens.scss`) and `value-keyword-case` on custom properties/font values (lowercased `BlinkMacSystemFont` and `optimizeLegibility`).
- `husky` + `lint-staged` run `eslint --fix`, `stylelint --fix` and `prettier --write` on staged files at commit time.
- Commands: `npm run lint` · `npm run lint:styles` · `npm run format` · `npm run check` (format + lint + styles + tests). CI runs the same set in `.github/workflows/quality.yml`.

## Adding a new dock app (the established recipe)

Follow this order — it's what every existing app followed and keeps `AppId` the single source of truth:

1. Add the id to the `AppId` union in `core/window-manager/window.model.ts`.
2. Add an entry to `DOCK_APPS` in `core/dock-apps/dock-apps.data.ts` (id, label, icon, `pinnedMobile`, `tooltip` translation key, `noWindow` if it shouldn't open a window).
3. If it renders list/grid content: add the data shape to `content/content.model.ts` if new, create `content/<name>.data.ts` keyed by `Lang`, and register it in `LIST_SOURCES`/`GRID_SOURCES` in `apps/app-host/app-host.component.ts`.
4. If it needs a custom UI (like `FinderAppComponent`/`AboutPortfolioComponent`): build it under `apps/<name>/`, wire it into `AppHostComponent`'s template as another `@else if (appId() === '<id>')` branch.
5. Add any new icon to `apps/app-icon/app-icon.component.html` (light/dark asset pair in `public/apps/`) — real brand icons via `simple-icons`, original style otherwise.
6. Add the translation keys the app needs to `core/i18n/translations.ts` (both `en`/`fr`).
7. Verify by hand — open the app in `fr` and `en`, check the production build still prerenders, re-run the Lighthouse audit (see Testing above; no `.spec.ts`).

## Known debt / cleanup log

- `tsconfig.json` doesn't set `"strict": true` — only the narrower `strictInjectionParameters`/`strictInputAccessModifiers`/`noImplicit*` flags are on. Flag before assuming full strict-mode guarantees hold.
- Removed `src/app/projet/` (empty leftover dir, only a stray `.DS_Store`, dead since the Angular 22 blank-slate rewrite) and `public/wallpaper.png` (orphaned asset, superseded by `wallpaper.jpg`) during a cleanup pass — if either reappears from a bad merge, delete again.
- Several `apps/*` still render placeholder/stub content (code projects, photos, designs, videos, notes) per the spec's explicit "content is a separate follow-up pass" scope — not a bug, but don't mistake it for a design decision to keep placeholders in shipped copy.
