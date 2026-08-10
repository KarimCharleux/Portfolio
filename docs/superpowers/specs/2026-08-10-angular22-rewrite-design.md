# Angular 22 blank-slate rewrite — design

## Context

Current repo is an Angular 15 portfolio (InstaRand, Le Monde du VTT, SNCHESS, ThreeJS demo,
card-effect, vanlife) built with NgModules, deployed as static Firebase Hosting, using
`@angular/fire` compat API for Firebase Analytics (`page_view` logged in
`AppComponent.ngAfterViewInit`).

Goal: throw away all portfolio content, keep only the Firebase/Analytics wiring, and land on
a fresh, blank Angular 22 app to build the new portfolio on top of later.

## Approach

Scaffold a real Angular 22 project via `@angular/cli@22` in a temp directory (not
hand-written config — Angular 22 postdates this assistant's training, so CLI-generated
config is the reliable source of truth), then transplant the generated files into this repo.

CLI flags for `ng new`:
- SSR: enabled (default in Angular 22 CLI)
- Zoneless: enabled (`provideZonelessChangeDetection`)
- Unit test runner: Vitest
- Styling: SCSS
- Standalone components (no NgModules)

## What gets deleted

- `src/app/home/`, `src/app/projet/**` (all portfolio components/pages)
- `src/assets/**` except the favicon
- `src/scss/**`, `src/font/**`
- `src/app/app.module.ts`, `src/app/app-routing.module.ts`
- `angular.json`, `tsconfig*.json`, `package.json`, `package-lock.json` — replaced by the
  fresh Angular 22 scaffold
- Karma/Jasmine config and devDependencies

## What's preserved

- `.git` history
- `.firebaserc`, `.idea/`, `.vscode/`
- `src/environments/environment.ts` — keeps `firebaseConfig` (apiKey, projectId,
  `measurementId` for GA) untouched
- Favicon (moved/renamed to the scaffold's standard `favicon.ico` location) and page title
  "Karim CHARLEUX - Portfolio"
- The `page_view` Analytics log-on-startup behavior, ported to the modern API

## New stack

- Angular 22, fully standalone (no NgModules), zoneless change detection
- SSR via Angular's built-in `@angular/ssr`
- Vitest for unit tests
- SCSS
- `AppComponent` renders an empty template — no routes, no business logic. This is the
  literal "blank page" starting point.

## Firebase / Analytics migration

Replace `@angular/fire/compat` + `AngularFireModule.initializeApp` with the modern modular
API:
- `provideFirebaseApp(() => initializeApp(environment.firebaseConfig))`
- `provideAnalytics(() => getAnalytics())`
- Inject `Analytics` and call `logEvent(analytics, 'page_view', { page_path: ... })` once on
  app startup (functionally equivalent to the current `AppComponent.ngAfterViewInit` call)

These providers go in `app.config.ts` (client) — SSR-safe guards apply if `getAnalytics()`
can't run on the server (Analytics is browser-only; must be conditioned on platform, e.g.
only provided/invoked in a browser `afterNextRender` or via `isPlatformBrowser` check).

## Deployment

Current `firebase.json` (`"public": "dist"`, static hosting) does not support SSR output.
Last step of the implementation: run `firebase init hosting` interactively so the Firebase
CLI detects the Angular SSR build itself and regenerates `firebase.json` (rather than
hand-guessing the frameworks-hosting config, since that tooling changes over time). Update
`package.json`'s `deploy` script to match whatever `firebase init` produces (likely just
`firebase deploy --only hosting`, letting Firebase's CLI drive the Angular build).

## Out of scope

- Any actual portfolio content/pages — this task ends at a blank, deployable shell.
- CI/CD changes beyond what's needed to build/deploy the blank shell.
