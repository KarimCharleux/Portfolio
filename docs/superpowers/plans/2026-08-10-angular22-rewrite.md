# Angular 15 → Angular 22 Blank-Slate Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Exception:** Task 5 requires an interactive terminal session with the user's live `firebase` CLI login and cannot be run by a headless dispatched subagent. It must be executed by the primary/orchestrating session directly, with the user present.

**Goal:** Replace the Angular 15 portfolio (all pages/components/assets) with a blank, deployable Angular 22 app — standalone, zoneless, SSR, Vitest — that preserves only the Firebase project config and the Analytics `page_view` log-on-startup behavior.

**Architecture:** Scaffold a real Angular 22 workspace via `@angular/cli@22 new` in a scratch directory (CLI-generated, not hand-written — Angular 22 postdates this assistant's training data, so the CLI output is the verified source of truth), then transplant the generated files into this repo, deleting all legacy portfolio content. Firebase is wired with the raw `firebase` SDK (no `@angular/fire` — see Global Constraints) via a small hand-written provider, guarded to run analytics only in the browser via `afterNextRender`.

**Tech Stack:** Angular 22.1.x, standalone components, zoneless change detection, `@angular/ssr`, Vitest, SCSS, raw `firebase` JS SDK, Node 24 LTS.

## Global Constraints

- Node version: **v22.22.3+, v24.15+, or v26+** required by Angular 22 CLI. This machine's default (via nvm) was v22.19.0 — too old. Use Node 24 LTS (verified as v24.19.0 via `nvm install 24 --lts`).
- **Do not add `@angular/fire`.** Its latest stable release peer-depends on `@angular/core@^20.0.0`; even its `next`-tag RC only reaches `^21.0.0`. No release supports Angular 22. Use the `firebase` package directly instead (already a repo dependency, framework-agnostic, no peer conflict).
- File naming: use the Angular CLI's 2025 style guide default (`app.ts`, `app.html`, `app.config.ts` — not `app.component.ts`). This is what `ng new --defaults` produces on Angular 22 and is what every code block below matches exactly.
- Preserve verbatim: `.git`, `.firebaserc`, `.vscode/` (existing repo files, not the scaffold's), `.editorconfig` (existing repo file), `src/environments/environment.ts` (has the live Firebase project config and GA `measurementId`).
- Package/workspace name stays `portfolio-angular` (not the scaffold's temp name).
- The app must build, serve, and pass its unit tests after every task — no broken intermediate states committed.

---

### Task 1: Pin Node 24 and verify toolchain

**Files:**
- Create: `.nvmrc`

**Interfaces:**
- Produces: a pinned Node version every subsequent task (and CI, in Task 5) assumes is active.

- [ ] **Step 1: Install Node 24 LTS via nvm**

```bash
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"
nvm install 24 --lts
nvm use 24
node -v
```

Expected: prints a `v24.x.x` version (verified during design as v24.19.0).

- [ ] **Step 2: Pin it for the repo**

Create `.nvmrc`:

```
24
```

- [ ] **Step 3: Verify Angular CLI 22 runs on this Node version**

```bash
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"; nvm use
npx --yes @angular/cli@22 version 2>&1 | grep -v EBADENGINE
```

Expected: no `Unsupported engine` / minimum Node version error; prints an Angular CLI version banner (`22.1.x`).

- [ ] **Step 4: Commit**

```bash
git add .nvmrc
git commit -m "Pin Node 24 for Angular 22 tooling"
```

---

### Task 2: Scaffold Angular 22 and transplant, deleting all legacy portfolio content

**Files:**
- Create (from scaffold, verified generated output on Angular 22.1.3): `angular.json`, `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `.prettierrc`, `public/favicon.ico`, `src/main.ts`, `src/main.server.ts`, `src/server.ts`, `src/index.html`, `src/styles.scss`, `src/app/app.ts`, `src/app/app.html`, `src/app/app.scss`, `src/app/app.config.ts`, `src/app/app.config.server.ts`, `src/app/app.routes.ts`, `src/app/app.routes.server.ts`, `src/app/app.spec.ts`
- Delete: `src/app/home/`, `src/app/projet/`, `src/app/app.module.ts`, `src/app/app-routing.module.ts`, `src/app/app.component.ts`, `src/app/app.component.html`, `src/app/app.component.scss`, `src/assets/`, `src/scss/`, `src/font/`, old root `angular.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `package.json`, `package-lock.json`
- Keep untouched: `src/environments/environment.ts`, `.git/`, `.firebaserc`, `.vscode/`, `.editorconfig`, `firebase.json` (rewritten in Task 5), `.github/workflows/*` (rewritten in Task 5)

**Interfaces:**
- Produces: `App` component (`src/app/app.ts`) with selector `app-root`, `appConfig` (`src/app/app.config.ts`) exported as `ApplicationConfig`, `routes` (`src/app/app.routes.ts`) exported as empty `Routes` array — Task 3 imports none of these directly except `App`, which it modifies in place.

- [ ] **Step 1: Generate the reference scaffold in a scratch directory**

```bash
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"; nvm use
cd /tmp && rm -rf angular22-scaffold
npx --yes @angular/cli@22 new angular22-scaffold \
  --defaults --style=scss --ssr --zoneless --skip-git --package-manager=npm
```

Expected: `CREATE` log lines for `angular.json`, `package.json`, `src/main.ts`, `src/app/app.ts`, `src/app/app.html`, etc., ending with `Packages installed successfully.`

- [ ] **Step 2: Delete all legacy app content in the repo**

```bash
cd /Users/karimcharleux/Developer/PortfolioAngular
rm -rf src/app/home src/app/projet src/assets src/scss src/font
rm -f src/app/app.module.ts src/app/app-routing.module.ts \
      src/app/app.component.ts src/app/app.component.html src/app/app.component.scss
rm -f angular.json tsconfig.json tsconfig.app.json tsconfig.spec.json \
      package.json package-lock.json
rm -f src/index.html src/main.ts
```

- [ ] **Step 3: Copy the scaffold's generated files into the repo**

```bash
SCAFFOLD=/tmp/angular22-scaffold
REPO=/Users/karimcharleux/Developer/PortfolioAngular

cp "$SCAFFOLD/angular.json" "$SCAFFOLD/package.json" "$SCAFFOLD/tsconfig.json" \
   "$SCAFFOLD/tsconfig.app.json" "$SCAFFOLD/tsconfig.spec.json" "$SCAFFOLD/.prettierrc" \
   "$REPO/"

mkdir -p "$REPO/public"
cp "$SCAFFOLD/public/favicon.ico" "$REPO/public/favicon.ico"

cp -R "$SCAFFOLD/src/app" "$REPO/src/app"
cp "$SCAFFOLD/src/main.ts" "$SCAFFOLD/src/main.server.ts" "$SCAFFOLD/src/server.ts" \
   "$SCAFFOLD/src/index.html" "$SCAFFOLD/src/styles.scss" \
   "$REPO/src/"
```

- [ ] **Step 4: Fix the workspace/package name (scaffold used a temp name)**

Edit `package.json`: change `"name": "angular22-scaffold"` to `"name": "portfolio-angular"`.

Edit `angular.json`: replace every occurrence of `"angular22-scaffold"` with `"portfolio-angular"` (project key, and the `serve:ssr:angular22-scaffold` npm script references need matching in `package.json` too — rename `serve:ssr:angular22-scaffold` script key to `serve:ssr:portfolio-angular` and its `dist/angular22-scaffold/...` path to `dist/portfolio-angular/...`).

- [ ] **Step 5: Install dependencies and verify the untouched scaffold builds**

```bash
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"; nvm use
cd /Users/karimcharleux/Developer/PortfolioAngular
npm install
npx ng build
```

Expected: `Application bundle generation complete.`, `Output location: .../dist/portfolio-angular`, no errors.

- [ ] **Step 6: Run the scaffold's own unit tests to confirm Vitest works end-to-end**

```bash
npx ng test --watch=false
```

Expected: `2 passed` (the scaffold's default `app.spec.ts` — this will be rewritten in Task 3 once the template goes blank).

- [ ] **Step 7: Clean up the scratch scaffold**

```bash
rm -rf /tmp/angular22-scaffold
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Replace Angular 15 portfolio with blank Angular 22 scaffold"
```

---

### Task 3: Wire Firebase (raw SDK) + blank template + branding

**Files:**
- Create: `src/app/core/firebase-app.ts`
- Modify: `src/app/app.ts`, `src/app/app.html`, `src/app/app.scss`, `src/app/app.spec.ts`, `src/index.html`
- Test: `src/app/app.spec.ts`

**Interfaces:**
- Produces: `getFirebaseApp(): FirebaseApp` from `src/app/core/firebase-app.ts`, used by `App`'s constructor in `src/app/app.ts`.
- Consumes: `environment.firebaseConfig` from `src/environments/environment.ts:3-11` (already in the repo, untouched — has `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId`).

- [ ] **Step 1: Add `firebase` as a direct dependency**

```bash
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"; nvm use
npm install "firebase@^10.4.0"
```

(Matches the version already used by the old `package.json`; the SDK is framework-agnostic so no Angular peer-dep concern.)

- [ ] **Step 2: Write the failing test for the blank template**

Replace `src/app/app.spec.ts` entirely:

```typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a blank page with no visible content', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.trim()).toBe('');
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

```bash
npx ng test --watch=false
```

Expected: FAIL — the second test fails because `app.html` still has the scaffold's placeholder marketing content (non-empty `textContent`).

- [ ] **Step 4: Write `src/app/core/firebase-app.ts`**

```typescript
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { environment } from '../../environments/environment';

let app: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(environment.firebaseConfig);
  }
  return app;
}
```

- [ ] **Step 5: Replace `src/app/app.ts`**

```typescript
import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirebaseApp } from './core/firebase-app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    afterNextRender(() => {
      try {
        const analytics = getAnalytics(getFirebaseApp());
        logEvent(analytics, 'page_view', { page_path: window.location.pathname });
      } catch (err) {
        console.error(err);
      }
    });
  }
}
```

(`afterNextRender` only ever runs in the browser, after hydration — this is the SSR-safe replacement for the old `AngularFireAnalytics` compat injection + `ngAfterViewInit` call. The `try/catch` mirrors the old code's fire-and-forget error handling, and keeps analytics failures from breaking the component in test environments where IndexedDB/network access may be unavailable.)

- [ ] **Step 6: Blank out the template and styles**

Replace `src/app/app.html` entirely:

```html
<router-outlet />
```

Replace `src/app/app.scss` entirely (empty file, 0 bytes — same as it already is post-scaffold).

- [ ] **Step 7: Run the test to verify it passes**

```bash
npx ng test --watch=false
```

Expected: `2 passed`.

- [ ] **Step 8: Restore branding in `src/index.html`**

Edit the `<title>` and confirm the favicon link (both already close to scaffold defaults, adjust title only):

```html
<title>Karim CHARLEUX - Portfolio</title>
```

(Leave `<link rel="icon" type="image/x-icon" href="favicon.ico">` as generated — it already points at `public/favicon.ico`, which Task 2 populated from the scaffold's default. Overwrite that file with the portfolio's original icon, recovered from git history since Task 2 deleted it:)

```bash
cd /Users/karimcharleux/Developer/PortfolioAngular
DELETE_COMMIT=$(git log -1 --diff-filter=D --format=%H -- src/assets/InstaRand/icon.ico)
git show "${DELETE_COMMIT}^:src/assets/InstaRand/icon.ico" > public/favicon.ico
```

(`git log --diff-filter=D` finds the commit that deleted the file — Task 2's transplant commit. Its parent (`^`) is the last commit where the file still existed, so `git show <parent>:<path>` recovers its exact contents regardless of how many commits land in between.)

- [ ] **Step 9: Verify build still succeeds**

```bash
npx ng build
```

Expected: `Application bundle generation complete.`, no errors, `Prerendered 1 static route.`

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "Wire Firebase Analytics via raw SDK, blank the app template"
```

---

### Task 4: Rewrite README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md`**

```markdown
# Portfolio Angular

Karim CHARLEUX's portfolio — Angular 22, standalone, zoneless, SSR, Vitest.

## Development

Requires Node 24 (see `.nvmrc`).

```bash
nvm use
npm install
npm start
```

Navigate to `http://localhost:4200/`.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Deploy

```bash
npm run deploy
```
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "Rewrite README for the Angular 22 rewrite"
```

---

### Task 5: Firebase Hosting SSR deploy config (interactive — primary session only)

**Files:**
- Modify: `firebase.json`, `package.json` (`deploy` script), `.github/workflows/firebase-hosting-merge.yml`, `.github/workflows/firebase-hosting-pull-request.yml`

**Why interactive:** `firebase init hosting` auto-detects the Angular SSR build via the CLI's web-frameworks integration and regenerates `firebase.json` (and optionally the GitHub Actions workflows) to match — its exact output format is Firebase-tooling-version-dependent, so hand-guessing it in this plan would likely be wrong. This step needs the user's live `firebase` CLI login/session and answers to its interactive prompts, so it cannot be run by a headless dispatched subagent.

**Actual outcome (deviated from the steps below):** running `npx firebase-tools@latest init hosting` (CLI 15.26.0 — the locally installed 13.29.1 was outdated) showed that Firebase's hosting init now routes any framework-detected app (Angular included) to **Firebase App Hosting**, not the classic Hosting + web-frameworks integration this plan assumed. App Hosting requires the Blaze (pay-as-you-go) billing plan; `karimagine-c1afb` is on the free Spark plan, and the init failed with `Error: Firebase App Hosting requires billing to be enabled`. Asked the user: enable Blaze billing (their account, their call), or fall back to classic static Hosting. User chose classic static Hosting. Since the app's single route is `RenderMode.Prerender` (set in `src/app/app.routes.server.ts` by the Task 2 scaffold), `ng build` already emits a fully static `dist/portfolio-angular/browser/index.html` — no server process is needed to serve a blank prerendered page, so this loses nothing today. Real SSR (dynamic routes) would need Blaze billing revisited later. Applied by hand instead of via `firebase init` (config is simple/stable, no need to fight the CLI's new App-Hosting-first flow):
- `firebase.json`: `"public": "dist"` → `"public": "dist/portfolio-angular/browser"`, rewrites unchanged (SPA fallback still correct for prerendered output)
- `package.json`: added `"deploy": "ng build && firebase deploy --only hosting"`
- Both workflow files: added the Step 3 `actions/setup-node@v4` + `.nvmrc` step below (still applies as written)

Steps 1-2 and 4 below (as originally written, assuming frameworks-aware hosting) were superseded by the above. Step 3 (Node pin in CI) and Step 5 (build verification) were carried out as written.

- [ ] **Step 1 (superseded, see Actual outcome above): Run `firebase init hosting` from the repo root**

```bash
cd /Users/karimcharleux/Developer/PortfolioAngular
firebase init hosting
```

Answer prompts:
- "Use an existing project" → `karimagine-c1afb`
- If asked about a framework/web-frameworks detection → accept the detected Angular SSR setup
- Do not overwrite `src/index.html` if prompted
- If asked about GitHub Actions deploy setup, accept it (regenerates the two existing workflow files) targeting the `master` branch

- [ ] **Step 2: Diff what changed**

```bash
git diff firebase.json .github/workflows/
```

Confirm `firebase.json` no longer says `"public": "dist"` and instead reflects a frameworks-aware SSR hosting config, and that both workflow files still reference `projectId: karimagine-c1afb` and the same `firebaseServiceAccount` secret name.

- [ ] **Step 3: Add explicit Node 24 pin to both GitHub Actions workflows**

In both `.github/workflows/firebase-hosting-merge.yml` and `.github/workflows/firebase-hosting-pull-request.yml`, add a `setup-node` step reading `.nvmrc` before the build step:

```yaml
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
      - run: npm ci && npm run build
```

(Without this, the runner may use an older default Node that fails the Angular 22 CLI's minimum-version check from Task 1.)

- [ ] **Step 4: Update the `deploy` script in `package.json` to match what `firebase init` wired up**

If `firebase init hosting` set up frameworks-aware hosting, `firebase deploy` drives the Angular build itself — simplify:

```json
"deploy": "firebase deploy --only hosting"
```

- [ ] **Step 5: Verify a local build still succeeds under the new hosting config**

```bash
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"; nvm use
npm run build
```

Expected: same as Task 2 Step 5 — clean build, no errors.

- [ ] **Step 6: Commit**

```bash
git add firebase.json .github/workflows/ package.json
git commit -m "Reconfigure Firebase Hosting for Angular 22 SSR"
```

---

### Task 6: Final end-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Full clean install and build**

```bash
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"; nvm use
rm -rf node_modules dist .angular
npm install
npm run build
```

Expected: clean success, `dist/portfolio-angular/browser` and `dist/portfolio-angular/server` both produced.

- [ ] **Step 2: Full test run**

```bash
npm test -- --watch=false
```

Expected: `2 passed`.

- [ ] **Step 3: Dev server smoke check**

```bash
npm start &
sleep 5
curl -s http://localhost:4200/ | grep -o '<title>[^<]*</title>'
kill %1
```

Expected: `<title>Karim CHARLEUX - Portfolio</title>`, and the response body contains `<app-root>` with no leftover portfolio content (no `InstaRand`, `snchess`, `vtt` strings).

- [ ] **Step 4: Confirm no legacy files remain**

```bash
find src -iname '*instarand*' -o -iname '*snchess*' -o -iname '*vtt*'
```

Expected: no output.
