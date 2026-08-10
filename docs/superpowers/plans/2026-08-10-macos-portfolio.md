# macOS-style Portfolio Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the macOS-style desktop shell (pixel-accurate menu bar, dock, real draggable/resizable multi-window manager) and its iOS-like mobile counterpart, on top of the blank Angular 22 scaffold, with 8 dock apps rendering placeholder content.

**Architecture:** Two parallel shells (`DesktopShellComponent` / `MobileShellComponent`) selected at the root via a `matchMedia`-backed `BreakpointService`, both consuming the same signals-based `WindowManagerService` and the same app-content components (`AppHostComponent` switches by `AppId`). Desktop renders real draggable/resizable `WindowComponent` chrome; mobile renders the frontmost app full-screen with a back button. All content is placeholder data for this pass.

**Tech Stack:** Angular 22 (standalone components, zoneless, signals), SCSS, Vitest + `TestBed` (existing `ng test` builder), `simple-icons` (MIT) for the four real brand marks in the dock.

## Global Constraints

- Angular 22 standalone components (no `standalone: true` needed — it's the default; match the existing `App` component's style).
- State: Angular **signals** only for `WindowManagerService`/`ClockService`/`BreakpointService` — no RxJS for this feature.
- Mobile breakpoint: `max-width: 767px` (from the design spec).
- Dock apps, fixed order: Notes, VS Code, Photoshop, Figma, YouTube, Mail, Safari, Finder (`docs/superpowers/specs/2026-08-10-macos-portfolio-design.md`).
- Real brand logos (VS Code, Photoshop, Figma, YouTube) come from the `simple-icons` npm package (MIT-licensed SVG path data) — never hand-typed/guessed path strings.
- Apple-owned icon artwork (Notes, Mail, Safari, Finder) and the desktop wallpaper are **original designs inspired by** the real thing, never reproductions of Apple's actual copyrighted assets — this was an explicit decision in the spec (see "Desktop wallpaper" section) and applies equally to the four Apple-style dock icons.
- Pixel-accurate chrome constants (sourced, not guessed):
  - macOS menu bar height: `24px`; menu-bar-extra item box: `22px`.
  - Traffic light buttons: `14px` diameter, `8px` gap, colors `#FF5F57` (close) / `#FEBC2E` (minimize) / `#28C840` (zoom).
  - MacBook notch (14" reference): `185px` × `32px`, rounded bottom corners.
  - iOS status bar height (notched iPhones): `47px`.
- Content is placeholder-only. No real projects/photos/videos/designs in this pass — every data file is clearly stub data, structured so a later pass can swap it in without touching components.
- Test runner: `nvm use 24 && npx ng test --include <spec-glob> --watch=false` (this repo pins Node 24 in `.nvmrc`; the installed default Node is too old for the Angular 22 CLI).

---

## File Structure

```
src/app/
  core/
    window-manager/
      window.model.ts
      window-manager.service.ts (+ .spec.ts)
    clock/
      clock.service.ts (+ .spec.ts)
    breakpoint/
      breakpoint.service.ts (+ .spec.ts)
    dock-apps/
      dock-app.model.ts
      dock-apps.data.ts
  content/
    content.model.ts
    notes.data.ts
    code-projects.data.ts
    photos.data.ts
    designs.data.ts
    videos.data.ts
    social-links.data.ts
  apps/
    app-icon/
      app-icon.component.ts (+ .html, .scss, .spec.ts)
    app-content-list/
      app-content-list.component.ts (+ .html, .scss, .spec.ts)
    app-content-grid/
      app-content-grid.component.ts (+ .html, .scss, .spec.ts)
    mail-app/
      mail-app.component.ts (+ .html, .scss, .spec.ts)
    finder-app/
      finder-app.component.ts (+ .html, .scss, .spec.ts)
    app-host/
      app-host.component.ts (+ .spec.ts)
  shell/
    design-tokens.scss
    window/
      window.component.ts (+ .html, .scss, .spec.ts)
    topbar/
      topbar.component.ts (+ .html, .scss, .spec.ts)
    dock/
      dock.component.ts (+ .html, .scss, .spec.ts)
    wallpaper/
      wallpaper.component.ts (+ .html, .scss, .spec.ts)
    desktop-shell/
      desktop-shell.component.ts (+ .html, .scss, .spec.ts)
    mobile-status-bar/
      mobile-status-bar.component.ts (+ .html, .scss, .spec.ts)
    mobile-home-screen/
      mobile-home-screen.component.ts (+ .html, .scss, .spec.ts)
    mobile-shell/
      mobile-shell.component.ts (+ .html, .scss, .spec.ts)
  app.ts (modify)
  app.html (modify)
  app.spec.ts (modify)
```

---

### Task 1: Window model + WindowManagerService

**Files:**
- Create: `src/app/core/window-manager/window.model.ts`
- Create: `src/app/core/window-manager/window-manager.service.ts`
- Test: `src/app/core/window-manager/window-manager.service.spec.ts`

**Interfaces:**
- Produces: `AppId` union type, `WindowState` interface, `WindowManagerService` with `windows: Signal<WindowState[]>`, `frontmost: Signal<WindowState | null>`, `open(appId, title)`, `close(id)`, `minimize(id)`, `restore(id)`, `focus(id)`, `move(id, x, y)`, `resize(id, width, height)`, `isOpen(appId)`.

- [ ] **Step 1: Write the model**

```ts
// src/app/core/window-manager/window.model.ts
export type AppId =
  | 'notes'
  | 'vscode'
  | 'photoshop'
  | 'figma'
  | 'youtube'
  | 'mail'
  | 'safari'
  | 'finder';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
}
```

- [ ] **Step 2: Write the failing tests**

```ts
// src/app/core/window-manager/window-manager.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { WindowManagerService } from './window-manager.service';

describe('WindowManagerService', () => {
  let service: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowManagerService);
  });

  it('starts with no windows open', () => {
    expect(service.windows()).toEqual([]);
    expect(service.frontmost()).toBeNull();
  });

  it('opens a window for an app', () => {
    service.open('notes', 'Notes');
    const wins = service.windows();
    expect(wins.length).toBe(1);
    expect(wins[0].appId).toBe('notes');
    expect(wins[0].title).toBe('Notes');
    expect(wins[0].minimized).toBe(false);
  });

  it('reuses the existing window instead of duplicating on a second open', () => {
    service.open('notes', 'Notes');
    service.open('notes', 'Notes');
    expect(service.windows().length).toBe(1);
  });

  it('cascades the position of successively opened windows', () => {
    service.open('notes', 'Notes');
    service.open('vscode', 'VS Code');
    const [first, second] = service.windows();
    expect(second.x).toBeGreaterThan(first.x);
    expect(second.y).toBeGreaterThan(first.y);
  });

  it('closes a window', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.close(id);
    expect(service.windows()).toEqual([]);
  });

  it('minimizes and restores a window', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.minimize(id);
    expect(service.windows()[0].minimized).toBe(true);
    service.restore(id);
    expect(service.windows()[0].minimized).toBe(false);
  });

  it('reopening a minimized app restores and focuses it', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.minimize(id);
    service.open('notes', 'Notes');
    expect(service.windows()[0].minimized).toBe(false);
  });

  it('focus raises a window above the others', () => {
    service.open('notes', 'Notes');
    service.open('vscode', 'VS Code');
    const notesId = service.windows()[0].id;
    service.focus(notesId);
    const notesWin = service.windows().find((w) => w.id === notesId)!;
    const vscodeWin = service.windows().find((w) => w.appId === 'vscode')!;
    expect(notesWin.zIndex).toBeGreaterThan(vscodeWin.zIndex);
    expect(service.frontmost()?.id).toBe(notesId);
  });

  it('move updates window position', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.move(id, 200, 150);
    const win = service.windows().find((w) => w.id === id)!;
    expect(win.x).toBe(200);
    expect(win.y).toBe(150);
  });

  it('resize updates window dimensions', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.resize(id, 900, 600);
    const win = service.windows().find((w) => w.id === id)!;
    expect(win.width).toBe(900);
    expect(win.height).toBe(600);
  });

  it('isOpen reflects whether an app has a window', () => {
    expect(service.isOpen('notes')).toBe(false);
    service.open('notes', 'Notes');
    expect(service.isOpen('notes')).toBe(true);
  });

  it('frontmost ignores minimized windows', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.minimize(id);
    expect(service.frontmost()).toBeNull();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `nvm use 24 && npx ng test --include src/app/core/window-manager/window-manager.service.spec.ts --watch=false`
Expected: FAIL — `window-manager.service.ts` does not exist yet.

- [ ] **Step 4: Implement the service**

```ts
// src/app/core/window-manager/window-manager.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { AppId, WindowState } from './window.model';

const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 480;
const CASCADE_OFFSET = 32;
const INITIAL_X = 80;
const INITIAL_Y = 60;

@Injectable({ providedIn: 'root' })
export class WindowManagerService {
  private readonly windowsSignal = signal<WindowState[]>([]);
  private nextZIndex = 1;
  private nextInstanceId = 0;

  readonly windows = this.windowsSignal.asReadonly();

  readonly frontmost = computed<WindowState | null>(() => {
    const open = this.windowsSignal().filter((w) => !w.minimized);
    if (open.length === 0) return null;
    return open.reduce((top, w) => (w.zIndex > top.zIndex ? w : top));
  });

  open(appId: AppId, title: string): void {
    const existing = this.windowsSignal().find((w) => w.appId === appId);
    if (existing) {
      this.restore(existing.id);
      this.focus(existing.id);
      return;
    }
    const count = this.windowsSignal().length;
    const id = `win-${this.nextInstanceId++}`;
    const win: WindowState = {
      id,
      appId,
      title,
      x: INITIAL_X + count * CASCADE_OFFSET,
      y: INITIAL_Y + count * CASCADE_OFFSET,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      zIndex: this.nextZIndex++,
      minimized: false,
    };
    this.windowsSignal.update((wins) => [...wins, win]);
  }

  close(id: string): void {
    this.windowsSignal.update((wins) => wins.filter((w) => w.id !== id));
  }

  minimize(id: string): void {
    this.windowsSignal.update((wins) =>
      wins.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
  }

  restore(id: string): void {
    this.windowsSignal.update((wins) =>
      wins.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
    );
  }

  focus(id: string): void {
    const zIndex = this.nextZIndex++;
    this.windowsSignal.update((wins) => wins.map((w) => (w.id === id ? { ...w, zIndex } : w)));
  }

  move(id: string, x: number, y: number): void {
    this.windowsSignal.update((wins) => wins.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }

  resize(id: string, width: number, height: number): void {
    this.windowsSignal.update((wins) =>
      wins.map((w) => (w.id === id ? { ...w, width, height } : w)),
    );
  }

  isOpen(appId: AppId): boolean {
    return this.windowsSignal().some((w) => w.appId === appId);
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `nvm use 24 && npx ng test --include src/app/core/window-manager/window-manager.service.spec.ts --watch=false`
Expected: PASS (13 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/core/window-manager/
git commit -m "feat: add window model and signals-based WindowManagerService"
```

---

### Task 2: ClockService

**Files:**
- Create: `src/app/core/clock/clock.service.ts`
- Test: `src/app/core/clock/clock.service.spec.ts`

**Interfaces:**
- Produces: `ClockService` with `now: Signal<Date>`, ticking every second in the browser, frozen (no interval) on the server.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/core/clock/clock.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { vi } from 'vitest';
import { ClockService } from './clock.service';

describe('ClockService', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('exposes the current time and ticks every second on the browser', () => {
    vi.useFakeTimers();
    const start = new Date('2026-08-10T10:00:00.000Z');
    vi.setSystemTime(start);

    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    const service = TestBed.inject(ClockService);
    expect(service.now().getTime()).toBe(start.getTime());

    vi.setSystemTime(new Date('2026-08-10T10:00:01.000Z'));
    vi.advanceTimersByTime(1000);
    expect(service.now().getTime()).toBe(new Date('2026-08-10T10:00:01.000Z').getTime());
  });

  it('does not start an interval on the server', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(globalThis, 'setInterval');
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    TestBed.inject(ClockService);
    expect(spy).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/core/clock/clock.service.spec.ts --watch=false`
Expected: FAIL — `clock.service.ts` does not exist yet.

- [ ] **Step 3: Implement the service**

```ts
// src/app/core/clock/clock.service.ts
import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TICK_MS = 1000;

@Injectable({ providedIn: 'root' })
export class ClockService {
  private readonly nowSignal = signal(new Date());
  readonly now = this.nowSignal.asReadonly();

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return;
    }
    const destroyRef = inject(DestroyRef);
    const id = setInterval(() => this.nowSignal.set(new Date()), TICK_MS);
    destroyRef.onDestroy(() => clearInterval(id));
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/core/clock/clock.service.spec.ts --watch=false`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/core/clock/
git commit -m "feat: add ClockService with a browser-only ticking signal"
```

---

### Task 3: BreakpointService

**Files:**
- Create: `src/app/core/breakpoint/breakpoint.service.ts`
- Test: `src/app/core/breakpoint/breakpoint.service.spec.ts`

**Interfaces:**
- Produces: `BreakpointService` with `isMobile: Signal<boolean>`, backed by `matchMedia('(max-width: 767px)')` in the browser, `false` on the server.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/core/breakpoint/breakpoint.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { vi } from 'vitest';
import { BreakpointService } from './breakpoint.service';

describe('BreakpointService', () => {
  function mockMatchMedia(matches: boolean) {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];
    const mql = {
      matches,
      addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => listeners.push(cb),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue(mql),
    );
    return { mql, emit: (next: boolean) => listeners.forEach((cb) => cb({ matches: next } as MediaQueryListEvent)) };
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reflects the initial match state in the browser', () => {
    mockMatchMedia(true);
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    const service = TestBed.inject(BreakpointService);
    expect(service.isMobile()).toBe(true);
  });

  it('updates when the media query change fires', () => {
    const { emit } = mockMatchMedia(false);
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    const service = TestBed.inject(BreakpointService);
    expect(service.isMobile()).toBe(false);
    emit(true);
    expect(service.isMobile()).toBe(true);
  });

  it('defaults to false on the server without touching matchMedia', () => {
    const matchMediaSpy = vi.fn();
    vi.stubGlobal('matchMedia', matchMediaSpy);
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const service = TestBed.inject(BreakpointService);
    expect(service.isMobile()).toBe(false);
    expect(matchMediaSpy).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/core/breakpoint/breakpoint.service.spec.ts --watch=false`
Expected: FAIL — `breakpoint.service.ts` does not exist yet.

- [ ] **Step 3: Implement the service**

```ts
// src/app/core/breakpoint/breakpoint.service.ts
import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const MOBILE_MAX_WIDTH_PX = 767;

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private readonly isMobileSignal = signal(false);
  readonly isMobile = this.isMobileSignal.asReadonly();

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return;
    }
    const destroyRef = inject(DestroyRef);
    const mql = matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    this.isMobileSignal.set(mql.matches);
    const listener = (event: MediaQueryListEvent) => this.isMobileSignal.set(event.matches);
    mql.addEventListener('change', listener);
    destroyRef.onDestroy(() => mql.removeEventListener('change', listener));
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/core/breakpoint/breakpoint.service.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/core/breakpoint/
git commit -m "feat: add matchMedia-backed BreakpointService"
```

---

### Task 4: Dock app registry

**Files:**
- Create: `src/app/core/dock-apps/dock-app.model.ts`
- Create: `src/app/core/dock-apps/dock-apps.data.ts`
- Test: `src/app/core/dock-apps/dock-apps.data.spec.ts`

**Interfaces:**
- Consumes: `AppId` from `../window-manager/window.model`.
- Produces: `DockAppDef` interface (`id`, `label`, `icon`, `pinnedMobile`), `DOCK_APPS: DockAppDef[]` — the fixed, ordered list every later task (dock, mobile home screen, finder, app host headings) reads from.

- [ ] **Step 1: Write the model**

```ts
// src/app/core/dock-apps/dock-app.model.ts
import { AppId } from '../window-manager/window.model';

export interface DockAppDef {
  id: AppId;
  label: string;
  /** Key consumed by AppIconComponent to pick the right icon rendering. */
  icon: AppId;
  pinnedMobile: boolean;
}
```

- [ ] **Step 2: Write the failing test**

```ts
// src/app/core/dock-apps/dock-apps.data.spec.ts
import { DOCK_APPS } from './dock-apps.data';

describe('DOCK_APPS', () => {
  it('has exactly the 8 apps in the spec order', () => {
    expect(DOCK_APPS.map((a) => a.id)).toEqual([
      'notes',
      'vscode',
      'photoshop',
      'figma',
      'youtube',
      'mail',
      'safari',
      'finder',
    ]);
  });

  it('pins exactly Notes, VS Code, Mail, and Finder for the mobile dock row', () => {
    const pinned = DOCK_APPS.filter((a) => a.pinnedMobile).map((a) => a.id);
    expect(pinned).toEqual(['notes', 'vscode', 'mail', 'finder']);
  });

  it('every app has a non-empty label', () => {
    for (const app of DOCK_APPS) {
      expect(app.label.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/core/dock-apps/dock-apps.data.spec.ts --watch=false`
Expected: FAIL — `dock-apps.data.ts` does not exist yet.

- [ ] **Step 4: Implement the data**

```ts
// src/app/core/dock-apps/dock-apps.data.ts
import { DockAppDef } from './dock-app.model';

export const DOCK_APPS: DockAppDef[] = [
  { id: 'notes', label: 'Notes', icon: 'notes', pinnedMobile: true },
  { id: 'vscode', label: 'VS Code', icon: 'vscode', pinnedMobile: true },
  { id: 'photoshop', label: 'Photoshop', icon: 'photoshop', pinnedMobile: false },
  { id: 'figma', label: 'Figma', icon: 'figma', pinnedMobile: false },
  { id: 'youtube', label: 'YouTube', icon: 'youtube', pinnedMobile: false },
  { id: 'mail', label: 'Mail', icon: 'mail', pinnedMobile: true },
  { id: 'safari', label: 'Safari', icon: 'safari', pinnedMobile: false },
  { id: 'finder', label: 'Finder', icon: 'finder', pinnedMobile: true },
];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/core/dock-apps/dock-apps.data.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/core/dock-apps/
git commit -m "feat: add the fixed 8-app dock registry"
```

---

### Task 5: Content model + placeholder data

**Files:**
- Create: `src/app/content/content.model.ts`
- Create: `src/app/content/notes.data.ts`
- Create: `src/app/content/code-projects.data.ts`
- Create: `src/app/content/social-links.data.ts`
- Create: `src/app/content/photos.data.ts`
- Create: `src/app/content/designs.data.ts`
- Create: `src/app/content/videos.data.ts`
- Test: `src/app/content/content.data.spec.ts`

**Interfaces:**
- Produces: `ListItem` (`id`, `title`, `subtitle`, optional `url`) and `GridItem` (`id`, `title`, `caption`, `accentColor`) — the two shapes every content app renders. Domain aliases (`NoteEntry`, `CodeProject`, `SocialLink` = `ListItem`; `Photo`, `DesignWork`, `Video` = `GridItem`) keep each data file self-describing. Also produces `NOTES`, `CODE_PROJECTS`, `SOCIAL_LINKS`, `PHOTOS`, `DESIGNS`, `VIDEOS` — the arrays `AppHostComponent` (Task 11) and `FinderAppComponent` (Task 10) read from.

- [ ] **Step 1: Write the model**

```ts
// src/app/content/content.model.ts
export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
}

export interface GridItem {
  id: string;
  title: string;
  caption: string;
  /** CSS color for the placeholder tile background. */
  accentColor: string;
}

export type NoteEntry = ListItem;
export type CodeProject = ListItem;
export type SocialLink = ListItem;
export type Photo = GridItem;
export type DesignWork = GridItem;
export type Video = GridItem;
```

- [ ] **Step 2: Write the failing test**

```ts
// src/app/content/content.data.spec.ts
import { NOTES } from './notes.data';
import { CODE_PROJECTS } from './code-projects.data';
import { SOCIAL_LINKS } from './social-links.data';
import { PHOTOS } from './photos.data';
import { DESIGNS } from './designs.data';
import { VIDEOS } from './videos.data';

describe('placeholder content data', () => {
  it.each([
    ['NOTES', NOTES],
    ['CODE_PROJECTS', CODE_PROJECTS],
    ['SOCIAL_LINKS', SOCIAL_LINKS],
    ['PHOTOS', PHOTOS],
    ['DESIGNS', DESIGNS],
    ['VIDEOS', VIDEOS],
  ])('%s is a non-empty array of items with unique ids', (_name, items) => {
    expect(items.length).toBeGreaterThan(0);
    const ids = new Set(items.map((item) => item.id));
    expect(ids.size).toBe(items.length);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/content/content.data.spec.ts --watch=false`
Expected: FAIL — data files don't exist yet.

- [ ] **Step 4: Implement the placeholder data**

```ts
// src/app/content/notes.data.ts
import { NoteEntry } from './content.model';

export const NOTES: NoteEntry[] = [
  {
    id: 'note-who-i-am',
    title: 'Who I am',
    subtitle: 'Placeholder bio line — swap with a real introduction.',
  },
  {
    id: 'note-what-i-do',
    title: 'What I do',
    subtitle: 'Placeholder — swap with real areas of focus.',
  },
  {
    id: 'note-now',
    title: 'Right now',
    subtitle: 'Placeholder — swap with current focus/availability.',
  },
];
```

```ts
// src/app/content/code-projects.data.ts
import { CodeProject } from './content.model';

export const CODE_PROJECTS: CodeProject[] = [
  {
    id: 'project-one',
    title: 'Placeholder project one',
    subtitle: 'Placeholder description — swap with a real repo summary.',
  },
  {
    id: 'project-two',
    title: 'Placeholder project two',
    subtitle: 'Placeholder description — swap with a real repo summary.',
  },
  {
    id: 'project-three',
    title: 'Placeholder project three',
    subtitle: 'Placeholder description — swap with a real repo summary.',
  },
];
```

```ts
// src/app/content/social-links.data.ts
import { SocialLink } from './content.model';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'link-github',
    title: 'GitHub',
    subtitle: 'Placeholder — swap with the real profile URL.',
    url: 'https://github.com/',
  },
  {
    id: 'link-linkedin',
    title: 'LinkedIn',
    subtitle: 'Placeholder — swap with the real profile URL.',
    url: 'https://www.linkedin.com/',
  },
];
```

```ts
// src/app/content/photos.data.ts
import { Photo } from './content.model';

export const PHOTOS: Photo[] = [
  { id: 'photo-1', title: 'Placeholder photo 1', caption: 'Swap with a real photo.', accentColor: '#8E8E93' },
  { id: 'photo-2', title: 'Placeholder photo 2', caption: 'Swap with a real photo.', accentColor: '#A2845E' },
  { id: 'photo-3', title: 'Placeholder photo 3', caption: 'Swap with a real photo.', accentColor: '#5E5CE6' },
  { id: 'photo-4', title: 'Placeholder photo 4', caption: 'Swap with a real photo.', accentColor: '#34C759' },
];
```

```ts
// src/app/content/designs.data.ts
import { DesignWork } from './content.model';

export const DESIGNS: DesignWork[] = [
  { id: 'design-1', title: 'Placeholder design 1', caption: 'Swap with real design work.', accentColor: '#FF375F' },
  { id: 'design-2', title: 'Placeholder design 2', caption: 'Swap with real design work.', accentColor: '#0A84FF' },
  { id: 'design-3', title: 'Placeholder design 3', caption: 'Swap with real design work.', accentColor: '#BF5AF2' },
];
```

```ts
// src/app/content/videos.data.ts
import { Video } from './content.model';

export const VIDEOS: Video[] = [
  { id: 'video-1', title: 'Placeholder video 1', caption: 'Swap with a real video project.', accentColor: '#FF453A' },
  { id: 'video-2', title: 'Placeholder video 2', caption: 'Swap with a real video project.', accentColor: '#FF9F0A' },
];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/content/content.data.spec.ts --watch=false`
Expected: PASS (6 tests via `it.each`).

- [ ] **Step 6: Commit**

```bash
git add src/app/content/
git commit -m "feat: add typed placeholder content data for every dock app"
```

---

### Task 6: AppIconComponent

**Files:**
- Create: `src/app/apps/app-icon/app-icon.component.ts`
- Create: `src/app/apps/app-icon/app-icon.component.html`
- Create: `src/app/apps/app-icon/app-icon.component.scss`
- Test: `src/app/apps/app-icon/app-icon.component.spec.ts`
- Modify: `package.json` (add `simple-icons` dependency)

**Interfaces:**
- Consumes: `AppId` from `core/window-manager/window.model`.
- Produces: `AppIconComponent` with `icon = input.required<AppId>()`, selector `app-icon` — used by `DockComponent` (Task 14) and `MobileHomeScreenComponent` (Task 18).

- [ ] **Step 1: Install the icon package**

Run: `npm install simple-icons`
Expected: `simple-icons` added to `dependencies` in `package.json`.

- [ ] **Step 2: Write the failing test**

```ts
// src/app/apps/app-icon/app-icon.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppIconComponent } from './app-icon.component';

describe('AppIconComponent', () => {
  async function render(icon: AppIconComponent['icon'] extends infer _ ? string : never) {
    const fixture = TestBed.createComponent(AppIconComponent);
    fixture.componentRef.setInput('icon', icon);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppIconComponent] });
  });

  it('renders a brand-mark svg for vscode', async () => {
    const el = await render('vscode');
    expect(el.querySelector('svg')).toBeTruthy();
  });

  it('renders a custom svg for notes', async () => {
    const el = await render('notes');
    expect(el.querySelector('svg')).toBeTruthy();
  });

  it('renders a custom svg for every dock app id', async () => {
    for (const icon of ['notes', 'vscode', 'photoshop', 'figma', 'youtube', 'mail', 'safari', 'finder']) {
      const el = await render(icon);
      expect(el.querySelector('svg')).toBeTruthy();
    }
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-icon/app-icon.component.spec.ts --watch=false`
Expected: FAIL — `app-icon.component.ts` does not exist yet.

- [ ] **Step 4: Implement the component**

```ts
// src/app/apps/app-icon/app-icon.component.ts
import { Component, computed, input } from '@angular/core';
import { siVisualstudiocode, siAdobephotoshop, siFigma, siYoutube } from 'simple-icons';
import { AppId } from '../../core/window-manager/window.model';

const BRAND_ICONS: Partial<Record<AppId, { path: string; hex: string }>> = {
  vscode: siVisualstudiocode,
  photoshop: siAdobephotoshop,
  figma: siFigma,
  youtube: siYoutube,
};

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrl: './app-icon.component.scss',
})
export class AppIconComponent {
  readonly icon = input.required<AppId>();

  protected readonly brand = computed(() => BRAND_ICONS[this.icon()] ?? null);
}
```

If `siVisualstudiocode` / `siAdobephotoshop` / `siFigma` / `siYoutube` fail to import (the installed `simple-icons` version renamed the export), open `node_modules/simple-icons/index.d.ts` and grep for the icon's slug (`grep -i photoshop node_modules/simple-icons/index.d.ts`) to find the actual exported name, then use that instead.

```html
<!-- src/app/apps/app-icon/app-icon.component.html -->
@if (brand(); as mark) {
  <svg viewBox="0 0 24 24" [style.fill]="'#' + mark.hex" aria-hidden="true">
    <path [attr.d]="mark.path" />
  </svg>
} @else {
  @switch (icon()) {
    @case ('notes') {
      <svg viewBox="0 0 24 24" aria-hidden="true" class="icon icon--notes">
        <rect x="1" y="1" width="22" height="22" rx="5" fill="#FFD60A" />
        <line x1="5" y1="8" x2="19" y2="8" stroke="#8A6D00" stroke-width="1.4" />
        <line x1="5" y1="12" x2="19" y2="12" stroke="#8A6D00" stroke-width="1.4" />
        <line x1="5" y1="16" x2="14" y2="16" stroke="#8A6D00" stroke-width="1.4" />
      </svg>
    }
    @case ('mail') {
      <svg viewBox="0 0 24 24" aria-hidden="true" class="icon icon--mail">
        <rect x="1" y="1" width="22" height="22" rx="5" fill="#0A84FF" />
        <path d="M4 7l8 6 8-6" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="4" y="7" width="16" height="11" rx="1.5" fill="none" stroke="#FFFFFF" stroke-width="1.6" />
      </svg>
    }
    @case ('safari') {
      <svg viewBox="0 0 24 24" aria-hidden="true" class="icon icon--safari">
        <circle cx="12" cy="12" r="11" fill="#EAF4FF" stroke="#0A84FF" stroke-width="1" />
        <polygon points="15.5,8.5 13,13 8.5,15.5 11,11" fill="#FF3B30" />
        <polygon points="15.5,8.5 13,13 11,11" fill="#F2F2F7" />
      </svg>
    }
    @case ('finder') {
      <svg viewBox="0 0 24 24" aria-hidden="true" class="icon icon--finder">
        <rect x="1" y="1" width="22" height="22" rx="5" fill="#0A84FF" />
        <path d="M12 1a11 11 0 000 22z" fill="#F2F2F7" />
        <circle cx="9" cy="9" r="1.3" fill="#0A84FF" />
        <circle cx="9" cy="15" r="1.3" fill="#0A84FF" />
      </svg>
    }
  }
}
```

```scss
// src/app/apps/app-icon/app-icon.component.scss
:host {
  display: block;
  width: 100%;
  height: 100%;
}

svg {
  width: 100%;
  height: 100%;
  display: block;
}

.icon--mail path,
.icon--mail rect:last-of-type {
  vector-effect: non-scaling-stroke;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-icon/app-icon.component.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/apps/app-icon/ package.json package-lock.json
git commit -m "feat: add AppIconComponent (simple-icons brand marks + original Apple-style icons)"
```

---

### Task 7: AppContentListComponent

**Files:**
- Create: `src/app/apps/app-content-list/app-content-list.component.ts`
- Create: `src/app/apps/app-content-list/app-content-list.component.html`
- Create: `src/app/apps/app-content-list/app-content-list.component.scss`
- Test: `src/app/apps/app-content-list/app-content-list.component.spec.ts`

**Interfaces:**
- Consumes: `ListItem` from `content/content.model`.
- Produces: `AppContentListComponent` with `heading = input.required<string>()`, `items = input.required<ListItem[]>()`, selector `app-content-list` — used by `AppHostComponent` (Task 11) for Notes/VS Code/Safari.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/apps/app-content-list/app-content-list.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppContentListComponent } from './app-content-list.component';
import { ListItem } from '../../content/content.model';

describe('AppContentListComponent', () => {
  const items: ListItem[] = [
    { id: '1', title: 'First', subtitle: 'First subtitle' },
    { id: '2', title: 'Second', subtitle: 'Second subtitle', url: 'https://example.com' },
  ];

  function render() {
    const fixture = TestBed.createComponent(AppContentListComponent);
    fixture.componentRef.setInput('heading', 'My Heading');
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppContentListComponent] });
  });

  it('renders the heading', () => {
    const el = render();
    expect(el.querySelector('h2')?.textContent).toContain('My Heading');
  });

  it('renders one list item per entry', () => {
    const el = render();
    expect(el.querySelectorAll('li').length).toBe(2);
  });

  it('renders items with a url as links', () => {
    const el = render();
    const link = el.querySelector('a[href="https://example.com"]');
    expect(link?.textContent).toContain('Second');
  });

  it('renders items without a url as plain text', () => {
    const el = render();
    const links = Array.from(el.querySelectorAll('a')).map((a) => a.textContent?.trim());
    expect(links).not.toContain('First');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-content-list/app-content-list.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/apps/app-content-list/app-content-list.component.ts
import { Component, input } from '@angular/core';
import { ListItem } from '../../content/content.model';

@Component({
  selector: 'app-content-list',
  templateUrl: './app-content-list.component.html',
  styleUrl: './app-content-list.component.scss',
})
export class AppContentListComponent {
  readonly heading = input.required<string>();
  readonly items = input.required<ListItem[]>();
}
```

```html
<!-- src/app/apps/app-content-list/app-content-list.component.html -->
<div class="content-list">
  <h2 class="content-list__heading">{{ heading() }}</h2>
  <ul class="content-list__items">
    @for (item of items(); track item.id) {
      <li class="content-list__item">
        @if (item.url) {
          <a class="content-list__title" [href]="item.url" target="_blank" rel="noopener">{{
            item.title
          }}</a>
        } @else {
          <span class="content-list__title">{{ item.title }}</span>
        }
        <p class="content-list__subtitle">{{ item.subtitle }}</p>
      </li>
    }
  </ul>
</div>
```

```scss
// src/app/apps/app-content-list/app-content-list.component.scss
.content-list {
  padding: 24px;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
}

.content-list__heading {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px;
}

.content-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-list__item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 16px;
}

.content-list__title {
  display: block;
  font-weight: 600;
  font-size: 15px;
  color: inherit;
  text-decoration: none;
}

.content-list__subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6e6e73;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-content-list/app-content-list.component.spec.ts --watch=false`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/apps/app-content-list/
git commit -m "feat: add generic AppContentListComponent for text-based app content"
```

---

### Task 8: AppContentGridComponent

**Files:**
- Create: `src/app/apps/app-content-grid/app-content-grid.component.ts`
- Create: `src/app/apps/app-content-grid/app-content-grid.component.html`
- Create: `src/app/apps/app-content-grid/app-content-grid.component.scss`
- Test: `src/app/apps/app-content-grid/app-content-grid.component.spec.ts`

**Interfaces:**
- Consumes: `GridItem` from `content/content.model`.
- Produces: `AppContentGridComponent` with `heading = input.required<string>()`, `items = input.required<GridItem[]>()`, selector `app-content-grid` — used by `AppHostComponent` (Task 11) for Photoshop/Figma/YouTube.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/apps/app-content-grid/app-content-grid.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppContentGridComponent } from './app-content-grid.component';
import { GridItem } from '../../content/content.model';

describe('AppContentGridComponent', () => {
  const items: GridItem[] = [
    { id: '1', title: 'Tile one', caption: 'Caption one', accentColor: '#FF0000' },
    { id: '2', title: 'Tile two', caption: 'Caption two', accentColor: '#00FF00' },
  ];

  function render() {
    const fixture = TestBed.createComponent(AppContentGridComponent);
    fixture.componentRef.setInput('heading', 'My Gallery');
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppContentGridComponent] });
  });

  it('renders the heading', () => {
    const el = render();
    expect(el.querySelector('h2')?.textContent).toContain('My Gallery');
  });

  it('renders one tile per entry with its accent color', () => {
    const el = render();
    const tiles = el.querySelectorAll<HTMLElement>('.content-grid__tile');
    expect(tiles.length).toBe(2);
    expect(tiles[0].style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('renders each tile caption', () => {
    const el = render();
    expect(el.textContent).toContain('Caption one');
    expect(el.textContent).toContain('Caption two');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-content-grid/app-content-grid.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/apps/app-content-grid/app-content-grid.component.ts
import { Component, input } from '@angular/core';
import { GridItem } from '../../content/content.model';

@Component({
  selector: 'app-content-grid',
  templateUrl: './app-content-grid.component.html',
  styleUrl: './app-content-grid.component.scss',
})
export class AppContentGridComponent {
  readonly heading = input.required<string>();
  readonly items = input.required<GridItem[]>();
}
```

```html
<!-- src/app/apps/app-content-grid/app-content-grid.component.html -->
<div class="content-grid">
  <h2 class="content-grid__heading">{{ heading() }}</h2>
  <div class="content-grid__tiles">
    @for (item of items(); track item.id) {
      <div class="content-grid__tile" [style.backgroundColor]="item.accentColor">
        <span class="content-grid__title">{{ item.title }}</span>
        <span class="content-grid__caption">{{ item.caption }}</span>
      </div>
    }
  </div>
</div>
```

```scss
// src/app/apps/app-content-grid/app-content-grid.component.scss
.content-grid {
  padding: 24px;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
}

.content-grid__heading {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px;
}

.content-grid__tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.content-grid__tile {
  aspect-ratio: 1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.content-grid__title {
  font-weight: 600;
  font-size: 13px;
}

.content-grid__caption {
  font-size: 11px;
  opacity: 0.9;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-content-grid/app-content-grid.component.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/apps/app-content-grid/
git commit -m "feat: add generic AppContentGridComponent for media-style app content"
```

---

### Task 9: MailAppComponent

**Files:**
- Create: `src/app/apps/mail-app/mail-app.component.ts`
- Create: `src/app/apps/mail-app/mail-app.component.html`
- Create: `src/app/apps/mail-app/mail-app.component.scss`
- Test: `src/app/apps/mail-app/mail-app.component.spec.ts`

**Interfaces:**
- Produces: `MailAppComponent`, selector `app-mail` — used by `AppHostComponent` (Task 11).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/apps/mail-app/mail-app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MailAppComponent } from './mail-app.component';

describe('MailAppComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<MailAppComponent>>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MailAppComponent, ReactiveFormsModule] });
    fixture = TestBed.createComponent(MailAppComponent);
    fixture.detectChanges();
  });

  it('does not mark submitted when the form is invalid', () => {
    fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.submitted()).toBe(false);
  });

  it('marks submitted when the form is valid', () => {
    fixture.componentInstance.form.setValue({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello there',
    });
    fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.submitted()).toBe(true);
  });

  it('rejects an invalid email', () => {
    fixture.componentInstance.form.setValue({
      name: 'Jane Doe',
      email: 'not-an-email',
      message: 'Hello there',
    });
    fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.submitted()).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/apps/mail-app/mail-app.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/apps/mail-app/mail-app.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail',
  imports: [ReactiveFormsModule],
  templateUrl: './mail-app.component.html',
  styleUrl: './mail-app.component.scss',
})
export class MailAppComponent {
  private readonly fb = inject(FormBuilder);

  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitted.set(false);
      return;
    }
    const { name, email, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    this.submitted.set(true);
  }
}
```

```html
<!-- src/app/apps/mail-app/mail-app.component.html -->
<div class="mail">
  <h2 class="mail__heading">Get in touch</h2>
  <form class="mail__form" [formGroup]="form" (ngSubmit)="onSubmit()">
    <label class="mail__field">
      <span>Name</span>
      <input type="text" formControlName="name" />
    </label>
    <label class="mail__field">
      <span>Email</span>
      <input type="email" formControlName="email" />
    </label>
    <label class="mail__field">
      <span>Message</span>
      <textarea rows="5" formControlName="message"></textarea>
    </label>
    <button type="submit" class="mail__submit">Send</button>
    @if (submitted()) {
      <p class="mail__confirmation">Thanks — your email client should open shortly.</p>
    }
  </form>
</div>
```

```scss
// src/app/apps/mail-app/mail-app.component.scss
.mail {
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.mail__heading {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px;
}

.mail__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
}

.mail__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: #6e6e73;
}

.mail__field input,
.mail__field textarea {
  font: inherit;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.mail__submit {
  align-self: flex-start;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #0a84ff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.mail__confirmation {
  font-size: 13px;
  color: #34c759;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/apps/mail-app/mail-app.component.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/apps/mail-app/
git commit -m "feat: add MailAppComponent with a mailto: contact form"
```

---

### Task 10: FinderAppComponent

**Files:**
- Create: `src/app/apps/finder-app/finder-app.component.ts`
- Create: `src/app/apps/finder-app/finder-app.component.html`
- Create: `src/app/apps/finder-app/finder-app.component.scss`
- Test: `src/app/apps/finder-app/finder-app.component.spec.ts`

**Interfaces:**
- Consumes: `DOCK_APPS` from `core/dock-apps/dock-apps.data`, `WindowManagerService.open` from Task 1, the six data arrays from Task 5.
- Produces: `FinderAppComponent`, selector `app-finder` — used by `AppHostComponent` (Task 11).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/apps/finder-app/finder-app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { FinderAppComponent } from './finder-app.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

describe('FinderAppComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<FinderAppComponent>>;
  let windowManager: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [FinderAppComponent] });
    fixture = TestBed.createComponent(FinderAppComponent);
    windowManager = TestBed.inject(WindowManagerService);
    fixture.detectChanges();
  });

  it('lists every dock app except itself', () => {
    const ids = fixture.componentInstance.categories.map((c) => c.id);
    expect(ids).not.toContain('finder');
    expect(ids.length).toBe(7);
  });

  it('shows a non-zero item count for a content-backed app', () => {
    const notes = fixture.componentInstance.categories.find((c) => c.id === 'notes');
    expect(notes?.count).toBeGreaterThan(0);
  });

  it('opens the corresponding window when a category is activated', () => {
    const openSpy = vi.spyOn(windowManager, 'open');
    fixture.componentInstance.open('notes', 'Notes');
    expect(openSpy).toHaveBeenCalledWith('notes', 'Notes');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/apps/finder-app/finder-app.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/apps/finder-app/finder-app.component.ts
import { Component, inject } from '@angular/core';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { AppId } from '../../core/window-manager/window.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { NOTES } from '../../content/notes.data';
import { CODE_PROJECTS } from '../../content/code-projects.data';
import { PHOTOS } from '../../content/photos.data';
import { DESIGNS } from '../../content/designs.data';
import { VIDEOS } from '../../content/videos.data';
import { SOCIAL_LINKS } from '../../content/social-links.data';

const CONTENT_COUNTS: Partial<Record<AppId, number>> = {
  notes: NOTES.length,
  vscode: CODE_PROJECTS.length,
  photoshop: PHOTOS.length,
  figma: DESIGNS.length,
  youtube: VIDEOS.length,
  safari: SOCIAL_LINKS.length,
};

@Component({
  selector: 'app-finder',
  templateUrl: './finder-app.component.html',
  styleUrl: './finder-app.component.scss',
})
export class FinderAppComponent {
  private readonly windowManager = inject(WindowManagerService);

  readonly categories = DOCK_APPS.filter((app) => app.id !== 'finder').map((app) => ({
    id: app.id,
    label: app.label,
    count: CONTENT_COUNTS[app.id] ?? 0,
  }));

  open(appId: AppId, label: string): void {
    this.windowManager.open(appId, label);
  }
}
```

```html
<!-- src/app/apps/finder-app/finder-app.component.html -->
<div class="finder">
  <h2 class="finder__heading">All projects</h2>
  <ul class="finder__list">
    @for (category of categories; track category.id) {
      <li class="finder__row">
        <button type="button" class="finder__row-button" (click)="open(category.id, category.label)">
          <span class="finder__row-label">{{ category.label }}</span>
          <span class="finder__row-count">{{ category.count }}</span>
        </button>
      </li>
    }
  </ul>
</div>
```

```scss
// src/app/apps/finder-app/finder-app.component.scss
.finder {
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.finder__heading {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px;
}

.finder__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.finder__row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.finder__row-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  color: inherit;
}

.finder__row-count {
  color: #6e6e73;
  font-size: 13px;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/apps/finder-app/finder-app.component.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/apps/finder-app/
git commit -m "feat: add FinderAppComponent as the global project index"
```

---

### Task 11: AppHostComponent

**Files:**
- Create: `src/app/apps/app-host/app-host.component.ts`
- Test: `src/app/apps/app-host/app-host.component.spec.ts`

**Interfaces:**
- Consumes: `AppContentListComponent` (Task 7), `AppContentGridComponent` (Task 8), `MailAppComponent` (Task 9), `FinderAppComponent` (Task 10), the six data arrays (Task 5).
- Produces: `AppHostComponent` with `appId = input.required<AppId>()`, selector `app-host` — used by `DesktopShellComponent` (Task 16) and `MobileShellComponent` (Task 19). This is the single place that maps an `AppId` to its rendered content.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/apps/app-host/app-host.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppHostComponent } from './app-host.component';

describe('AppHostComponent', () => {
  function render(appId: string) {
    const fixture = TestBed.createComponent(AppHostComponent);
    fixture.componentRef.setInput('appId', appId);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppHostComponent] });
  });

  it('renders the mail app for "mail"', () => {
    expect(render('mail').querySelector('.mail__heading')).toBeTruthy();
  });

  it('renders the finder app for "finder"', () => {
    expect(render('finder').querySelector('.finder__heading')).toBeTruthy();
  });

  it('renders a content list for "notes"', () => {
    expect(render('notes').querySelector('.content-list__heading')?.textContent).toContain(
      'About Me',
    );
  });

  it('renders a content grid for "photoshop"', () => {
    expect(render('photoshop').querySelector('.content-grid__heading')?.textContent).toContain(
      'Photos',
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-host/app-host.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/apps/app-host/app-host.component.ts
import { Component, computed, input } from '@angular/core';
import { AppId } from '../../core/window-manager/window.model';
import { ListItem, GridItem } from '../../content/content.model';
import { AppContentListComponent } from '../app-content-list/app-content-list.component';
import { AppContentGridComponent } from '../app-content-grid/app-content-grid.component';
import { MailAppComponent } from '../mail-app/mail-app.component';
import { FinderAppComponent } from '../finder-app/finder-app.component';
import { NOTES } from '../../content/notes.data';
import { CODE_PROJECTS } from '../../content/code-projects.data';
import { SOCIAL_LINKS } from '../../content/social-links.data';
import { PHOTOS } from '../../content/photos.data';
import { DESIGNS } from '../../content/designs.data';
import { VIDEOS } from '../../content/videos.data';

const LIST_CONTENT: Partial<Record<AppId, { heading: string; items: ListItem[] }>> = {
  notes: { heading: 'About Me', items: NOTES },
  vscode: { heading: 'Code Projects', items: CODE_PROJECTS },
  safari: { heading: 'Links', items: SOCIAL_LINKS },
};

const GRID_CONTENT: Partial<Record<AppId, { heading: string; items: GridItem[] }>> = {
  photoshop: { heading: 'Photos', items: PHOTOS },
  figma: { heading: 'Design Work', items: DESIGNS },
  youtube: { heading: 'Video Projects', items: VIDEOS },
};

@Component({
  selector: 'app-host',
  imports: [AppContentListComponent, AppContentGridComponent, MailAppComponent, FinderAppComponent],
  template: `
    @if (appId() === 'mail') {
      <app-mail />
    } @else if (appId() === 'finder') {
      <app-finder />
    } @else if (listContent(); as list) {
      <app-content-list [heading]="list.heading" [items]="list.items" />
    } @else if (gridContent(); as grid) {
      <app-content-grid [heading]="grid.heading" [items]="grid.items" />
    }
  `,
})
export class AppHostComponent {
  readonly appId = input.required<AppId>();

  protected readonly listContent = computed(() => LIST_CONTENT[this.appId()] ?? null);
  protected readonly gridContent = computed(() => GRID_CONTENT[this.appId()] ?? null);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/apps/app-host/app-host.component.spec.ts --watch=false`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/apps/app-host/
git commit -m "feat: add AppHostComponent to route an AppId to its content"
```

---

### Task 12: Design tokens + WindowComponent

**Files:**
- Create: `src/app/shell/design-tokens.scss`
- Modify: `src/styles.scss` (import the tokens partial)
- Create: `src/app/shell/window/window.component.ts`
- Create: `src/app/shell/window/window.component.html`
- Create: `src/app/shell/window/window.component.scss`
- Test: `src/app/shell/window/window.component.spec.ts`

**Interfaces:**
- Consumes: `WindowState` (Task 1), `WindowManagerService` (Task 1).
- Produces: `WindowComponent` with `state = input.required<WindowState>()`, selector `app-window`, projecting body content via `<ng-content>` — used by `DesktopShellComponent` (Task 16). Also produces the shared `--menu-bar-height`, `--notch-width`, `--notch-height`, `--traffic-light-*`, `--window-radius`, `--ios-status-bar-height` CSS custom properties every later shell task reads.

- [ ] **Step 1: Write the design tokens**

```scss
// src/app/shell/design-tokens.scss
:root {
  --menu-bar-height: 24px;
  --menu-bar-item-size: 22px;

  --traffic-light-diameter: 14px;
  --traffic-light-gap: 8px;
  --traffic-light-close: #ff5f57;
  --traffic-light-minimize: #febc2e;
  --traffic-light-zoom: #28c840;

  --notch-width: 185px;
  --notch-height: 32px;

  --window-radius: 10px;
  --window-titlebar-height: 28px;

  --dock-icon-size: 52px;

  --ios-status-bar-height: 47px;
}

:root[data-theme='dark'] {
  --surface: #1e1e1e;
  --surface-secondary: #2c2c2e;
  --text-primary: #f5f5f7;
  --text-secondary: #86868b;
  --hairline: rgba(255, 255, 255, 0.12);
}

:root:not([data-theme='dark']) {
  --surface: #ffffff;
  --surface-secondary: #f5f5f7;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --hairline: rgba(0, 0, 0, 0.08);
}
```

- [ ] **Step 2: Import the tokens globally**

Modify `src/styles.scss` to add at the top:

```scss
@use './app/shell/design-tokens.scss';
```

- [ ] **Step 3: Write the failing test**

```ts
// src/app/shell/window/window.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { WindowComponent } from './window.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { WindowState } from '../../core/window-manager/window.model';

describe('WindowComponent', () => {
  let windowManager: WindowManagerService;

  const state: WindowState = {
    id: 'win-1',
    appId: 'notes',
    title: 'Notes',
    x: 50,
    y: 50,
    width: 400,
    height: 300,
    zIndex: 1,
    minimized: false,
  };

  function render() {
    const fixture = TestBed.createComponent(WindowComponent);
    fixture.componentRef.setInput('state', state);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [WindowComponent] });
    windowManager = TestBed.inject(WindowManagerService);
    windowManager.open('notes', 'Notes');
  });

  it('renders the window title and positions it from the state', () => {
    const { el } = render();
    expect(el.querySelector('.window__title')?.textContent).toContain('Notes');
    const section = el.querySelector<HTMLElement>('.window')!;
    expect(section.style.left).toBe('50px');
    expect(section.style.top).toBe('50px');
  });

  it('closes the matching window when the close button is clicked', () => {
    const openId = windowManager.windows()[0].id;
    const { el } = render();
    const closeButton = el.querySelector<HTMLButtonElement>('.window__traffic-light--close')!;
    closeButton.click();
    expect(windowManager.windows().find((w) => w.id === openId)).toBeUndefined();
  });

  it('minimizes the matching window when the minimize button is clicked', () => {
    const { el, fixture } = render();
    const minimizeButton = el.querySelector<HTMLButtonElement>(
      '.window__traffic-light--minimize',
    )!;
    minimizeButton.click();
    fixture.detectChanges();
    expect(windowManager.windows()[0].minimized).toBe(true);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/window/window.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 5: Implement the component**

```ts
// src/app/shell/window/window.component.ts
import { Component, inject, input } from '@angular/core';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { WindowState } from '../../core/window-manager/window.model';

const MIN_WIDTH = 320;
const MIN_HEIGHT = 240;
const MENU_BAR_HEIGHT = 24;

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent {
  private readonly windowManager = inject(WindowManagerService);

  readonly state = input.required<WindowState>();

  isFocused(): boolean {
    return this.windowManager.frontmost()?.id === this.state().id;
  }

  focus(): void {
    this.windowManager.focus(this.state().id);
  }

  close(): void {
    this.windowManager.close(this.state().id);
  }

  minimize(): void {
    this.windowManager.minimize(this.state().id);
  }

  onTitleBarPointerDown(event: PointerEvent): void {
    const current = this.state();
    this.windowManager.focus(current.id);

    const startX = event.clientX;
    const startY = event.clientY;
    const originX = current.x;
    const originY = current.y;

    const onMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const maxX = Math.max(window.innerWidth - current.width, 0);
      const maxY = Math.max(window.innerHeight - current.height, MENU_BAR_HEIGHT);
      const nextX = Math.min(Math.max(originX + dx, 0), maxX);
      const nextY = Math.min(Math.max(originY + dy, MENU_BAR_HEIGHT), maxY);
      this.windowManager.move(current.id, nextX, nextY);
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  onResizeHandlePointerDown(event: PointerEvent): void {
    event.stopPropagation();
    const current = this.state();
    this.windowManager.focus(current.id);

    const startX = event.clientX;
    const startY = event.clientY;
    const originWidth = current.width;
    const originHeight = current.height;

    const onMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const maxWidth = Math.max(window.innerWidth - current.x, MIN_WIDTH);
      const maxHeight = Math.max(window.innerHeight - current.y, MIN_HEIGHT);
      const width = Math.min(Math.max(originWidth + dx, MIN_WIDTH), maxWidth);
      const height = Math.min(Math.max(originHeight + dy, MIN_HEIGHT), maxHeight);
      this.windowManager.resize(current.id, width, height);
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
```

```html
<!-- src/app/shell/window/window.component.html -->
<section
  class="window"
  [class.window--focused]="isFocused()"
  [style.left.px]="state().x"
  [style.top.px]="state().y"
  [style.width.px]="state().width"
  [style.height.px]="state().height"
  [style.zIndex]="state().zIndex"
  (pointerdown)="focus()"
>
  <header class="window__titlebar" (pointerdown)="onTitleBarPointerDown($event)">
    <div class="window__traffic-lights">
      <button
        type="button"
        class="window__traffic-light window__traffic-light--close"
        aria-label="Close"
        (pointerdown)="stopPropagation($event)"
        (click)="close()"
      ></button>
      <button
        type="button"
        class="window__traffic-light window__traffic-light--minimize"
        aria-label="Minimize"
        (pointerdown)="stopPropagation($event)"
        (click)="minimize()"
      ></button>
      <button
        type="button"
        class="window__traffic-light window__traffic-light--zoom"
        aria-label="Zoom"
        disabled
        (pointerdown)="stopPropagation($event)"
      ></button>
    </div>
    <span class="window__title">{{ state().title }}</span>
  </header>
  <div class="window__body">
    <ng-content />
  </div>
  <div class="window__resize-handle" (pointerdown)="onResizeHandlePointerDown($event)"></div>
</section>
```

```scss
// src/app/shell/window/window.component.scss
.window {
  position: fixed;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-radius: var(--window-radius);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

.window--focused {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.32);
}

.window__titlebar {
  height: var(--window-titlebar-height);
  min-height: var(--window-titlebar-height);
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: var(--surface-secondary);
  cursor: grab;
  user-select: none;
  gap: 12px;
}

.window__traffic-lights {
  display: flex;
  gap: var(--traffic-light-gap);
  flex-shrink: 0;
}

.window__traffic-light {
  width: var(--traffic-light-diameter);
  height: var(--traffic-light-diameter);
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
}

.window__traffic-light--close {
  background: var(--traffic-light-close);
}

.window__traffic-light--minimize {
  background: var(--traffic-light-minimize);
}

.window__traffic-light--zoom {
  background: var(--traffic-light-zoom);
}

.window__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  text-align: center;
  margin-right: calc(var(--traffic-light-diameter) * 3 + var(--traffic-light-gap) * 2);
}

.window__body {
  flex: 1;
  overflow: auto;
  color: var(--text-primary);
}

.window__resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/window/window.component.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add src/app/shell/design-tokens.scss src/styles.scss src/app/shell/window/
git commit -m "feat: add pixel-sourced design tokens and the draggable/resizable WindowComponent"
```

---

### Task 13: TopbarComponent

**Files:**
- Create: `src/app/shell/topbar/topbar.component.ts`
- Create: `src/app/shell/topbar/topbar.component.html`
- Create: `src/app/shell/topbar/topbar.component.scss`
- Test: `src/app/shell/topbar/topbar.component.spec.ts`

**Interfaces:**
- Consumes: `ClockService` (Task 2), `WindowManagerService` (Task 1).
- Produces: `TopbarComponent`, selector `app-topbar` — used by `DesktopShellComponent` (Task 16).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shell/topbar/topbar.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

describe('TopbarComponent', () => {
  let windowManager: WindowManagerService;

  function render() {
    const fixture = TestBed.createComponent(TopbarComponent);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({ imports: [TopbarComponent] });
    windowManager = TestBed.inject(WindowManagerService);
  });

  it('shows the owner name when no app is focused', () => {
    const { el } = render();
    expect(el.querySelector('.topbar__app-name')?.textContent).toContain('Karim Charleux');
  });

  it('shows the frontmost app title once a window is open', () => {
    windowManager.open('notes', 'Notes');
    const { el } = render();
    expect(el.querySelector('.topbar__app-name')?.textContent).toContain('Notes');
  });

  it('renders a live clock', () => {
    const { el } = render();
    expect(el.querySelector('.topbar__clock')?.textContent?.trim().length).toBeGreaterThan(0);
  });

  it('toggles the document theme when the dark/light button is clicked', () => {
    const { el } = render();
    const button = el.querySelector<HTMLButtonElement>('.topbar__theme-toggle')!;
    button.click();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    button.click();
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/topbar/topbar.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/shell/topbar/topbar.component.ts
import { Component, computed, inject, signal } from '@angular/core';
import { ClockService } from '../../core/clock/clock.service';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private readonly clock = inject(ClockService);
  private readonly windowManager = inject(WindowManagerService);

  protected readonly darkMode = signal(false);

  protected readonly activeAppName = computed(
    () => this.windowManager.frontmost()?.title ?? 'Karim Charleux',
  );

  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(this.clock.now()),
  );

  toggleTheme(): void {
    this.darkMode.update((value) => !value);
    document.documentElement.dataset['theme'] = this.darkMode() ? 'dark' : 'light';
  }
}
```

```html
<!-- src/app/shell/topbar/topbar.component.html -->
<header class="topbar">
  <div class="topbar__left">
    <svg class="topbar__apple-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.365 1.43c0 1.14-.428 2.06-1.284 2.98-.928.99-2.06 1.56-3.204 1.47-.114-1.11.428-2.28 1.284-3.13.856-.87 2.28-1.47 3.204-1.32zM20.5 17.34c-.57 1.32-.85 1.91-1.6 3.08-1.04 1.63-2.5 3.66-4.32 3.68-1.62.02-2.04-1.06-4.24-1.05-2.2.01-2.66 1.07-4.28 1.05-1.82-.02-3.2-1.85-4.24-3.48C-.6 16.98-.98 12.14 1.1 9.55c1.06-1.32 2.75-2.15 4.42-2.17 1.64-.02 2.66 1.11 4.16 1.11 1.5 0 3.16-1.37 5.32-1.17.9.04 3.44.36 5.06 2.74-.13.08-3.02 1.76-2.98 5.28.04 4.2 3.68 5.6 3.72 5.62-.03.1-.58 2.01-1.3 3.38z"
      />
    </svg>
    <span class="topbar__app-name">{{ activeAppName() }}</span>
  </div>

  <div class="topbar__notch"></div>

  <div class="topbar__right">
    <svg class="topbar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM6.4 14.9a8 8 0 0111.2 0l-1.6 1.6a5.8 5.8 0 00-8 0zM3 11.5a12.5 12.5 0 0118 0l-1.6 1.6a10.3 10.3 0 00-14.8 0z"
      />
    </svg>
    <svg class="topbar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.4" />
      <rect x="4" y="9" width="12.5" height="6" rx="1" fill="currentColor" />
      <rect x="21" y="10" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
    <span class="topbar__clock">{{ formattedTime() }}</span>
    <button type="button" class="topbar__theme-toggle" (click)="toggleTheme()" aria-label="Toggle dark mode">
      @if (darkMode()) {
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor" /></svg>
      } @else {
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3a9 9 0 108.94 10.06A7 7 0 0112 3z"
          />
        </svg>
      }
    </button>
  </div>
</header>
```

```scss
// src/app/shell/topbar/topbar.component.scss
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--menu-bar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 13px;
  z-index: 10000;
  box-shadow: 0 1px 0 var(--hairline);
}

.topbar__left,
.topbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.topbar__right {
  justify-content: flex-end;
}

.topbar__apple-logo {
  width: var(--menu-bar-item-size);
  height: var(--menu-bar-item-size);
}

.topbar__app-name {
  font-weight: 600;
}

.topbar__notch {
  width: var(--notch-width);
  height: var(--notch-height);
  background: #000;
  border-radius: 0 0 10px 10px;
  flex-shrink: 0;
}

.topbar__icon {
  width: var(--menu-bar-item-size);
  height: var(--menu-bar-item-size);
}

.topbar__theme-toggle {
  width: var(--menu-bar-item-size);
  height: var(--menu-bar-item-size);
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 0;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/topbar/topbar.component.spec.ts --watch=false`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/shell/topbar/
git commit -m "feat: add pixel-accurate macOS TopbarComponent"
```

---

### Task 14: DockComponent

**Files:**
- Create: `src/app/shell/dock/dock.component.ts`
- Create: `src/app/shell/dock/dock.component.html`
- Create: `src/app/shell/dock/dock.component.scss`
- Test: `src/app/shell/dock/dock.component.spec.ts`

**Interfaces:**
- Consumes: `DOCK_APPS` (Task 4), `AppIconComponent` (Task 6), `WindowManagerService` (Task 1).
- Produces: `DockComponent`, selector `app-dock` — used by `DesktopShellComponent` (Task 16).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shell/dock/dock.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { DockComponent } from './dock.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

describe('DockComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<DockComponent>>;
  let windowManager: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [DockComponent] });
    fixture = TestBed.createComponent(DockComponent);
    windowManager = TestBed.inject(WindowManagerService);
    fixture.detectChanges();
  });

  it('renders one icon button per dock app', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.dock__icon');
    expect(buttons.length).toBe(8);
  });

  it('opens the app window when an icon is clicked', () => {
    const openSpy = vi.spyOn(windowManager, 'open');
    const notesButton = fixture.nativeElement.querySelector<HTMLButtonElement>(
      '.dock__icon[aria-label="Notes"]',
    )!;
    notesButton.click();
    expect(openSpy).toHaveBeenCalledWith('notes', 'Notes');
  });

  it('shows a running indicator only for open apps', () => {
    windowManager.open('notes', 'Notes');
    fixture.detectChanges();
    const notesButton = fixture.nativeElement.querySelector('.dock__icon[aria-label="Notes"]')!;
    const vscodeButton = fixture.nativeElement.querySelector('.dock__icon[aria-label="VS Code"]')!;
    expect(notesButton.querySelector('.dock__indicator')).toBeTruthy();
    expect(vscodeButton.querySelector('.dock__indicator')).toBeFalsy();
  });

  it('magnifies the hovered icon and its immediate neighbor more than a far icon', () => {
    const component = fixture.componentInstance;
    component.onIconEnter(3);
    expect(component.scaleFor(3)).toBeGreaterThan(component.scaleFor(2));
    expect(component.scaleFor(2)).toBeGreaterThan(component.scaleFor(0));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/dock/dock.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/shell/dock/dock.component.ts
import { Component, inject, signal } from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { AppId } from '../../core/window-manager/window.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-dock',
  imports: [AppIconComponent],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
})
export class DockComponent {
  private readonly windowManager = inject(WindowManagerService);

  protected readonly apps = DOCK_APPS;
  private readonly hoveredIndex = signal<number | null>(null);

  scaleFor(index: number): number {
    const hovered = this.hoveredIndex();
    if (hovered === null) return 1;
    const distance = Math.abs(index - hovered);
    if (distance === 0) return 1.6;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;
    return 1;
  }

  isOpen(appId: AppId): boolean {
    return this.windowManager.isOpen(appId);
  }

  onIconEnter(index: number): void {
    this.hoveredIndex.set(index);
  }

  onDockLeave(): void {
    this.hoveredIndex.set(null);
  }

  open(app: DockAppDef): void {
    this.windowManager.open(app.id, app.label);
  }
}
```

```html
<!-- src/app/shell/dock/dock.component.html -->
<nav class="dock" (pointerleave)="onDockLeave()">
  @for (app of apps; track app.id; let i = $index) {
    <button
      type="button"
      class="dock__icon"
      [style.transform]="'scale(' + scaleFor(i) + ')'"
      [attr.aria-label]="app.label"
      (pointerenter)="onIconEnter(i)"
      (click)="open(app)"
    >
      <app-icon [icon]="app.icon" />
      @if (isOpen(app.id)) {
        <span class="dock__indicator"></span>
      }
    </button>
  }
</nav>
```

```scss
// src/app/shell/dock/dock.component.scss
.dock {
  position: fixed;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--hairline);
  z-index: 9000;
}

.dock__icon {
  position: relative;
  width: var(--dock-icon-size);
  height: var(--dock-icon-size);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.12s ease-out;
  transform-origin: bottom center;
}

.dock__indicator {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-primary);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/dock/dock.component.spec.ts --watch=false`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/shell/dock/
git commit -m "feat: add DockComponent with hover magnification and running indicators"
```

---

### Task 15: WallpaperComponent

**Files:**
- Create: `src/app/shell/wallpaper/wallpaper.component.ts`
- Create: `src/app/shell/wallpaper/wallpaper.component.html`
- Create: `src/app/shell/wallpaper/wallpaper.component.scss`
- Test: `src/app/shell/wallpaper/wallpaper.component.spec.ts`

**Interfaces:**
- Produces: `WallpaperComponent`, selector `app-wallpaper` — used by the root `App` component (Task 20). Purely presentational, original abstract gradient artwork (not a reproduction of any Apple wallpaper asset — see the design spec).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shell/wallpaper/wallpaper.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { WallpaperComponent } from './wallpaper.component';

describe('WallpaperComponent', () => {
  it('renders a full-viewport background element', () => {
    TestBed.configureTestingModule({ imports: [WallpaperComponent] });
    const fixture = TestBed.createComponent(WallpaperComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.wallpaper')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/wallpaper/wallpaper.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/shell/wallpaper/wallpaper.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrl: './wallpaper.component.scss',
})
export class WallpaperComponent {}
```

```html
<!-- src/app/shell/wallpaper/wallpaper.component.html -->
<div class="wallpaper" aria-hidden="true"></div>
```

```scss
// src/app/shell/wallpaper/wallpaper.component.scss
// Original abstract gradient in the visual spirit of recent macOS default
// wallpapers — deliberately not a reproduction of any actual Apple artwork.
.wallpaper {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 149, 0, 0.55), transparent 45%),
    radial-gradient(circle at 80% 30%, rgba(94, 92, 230, 0.5), transparent 50%),
    radial-gradient(circle at 50% 90%, rgba(10, 132, 255, 0.55), transparent 55%),
    linear-gradient(160deg, #1c1c1e, #3a2e57 45%, #0a3d62 100%);
  background-color: #1c1c1e;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/wallpaper/wallpaper.component.spec.ts --watch=false`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/app/shell/wallpaper/
git commit -m "feat: add original macOS-spirit WallpaperComponent"
```

---

### Task 16: DesktopShellComponent

**Files:**
- Create: `src/app/shell/desktop-shell/desktop-shell.component.ts`
- Create: `src/app/shell/desktop-shell/desktop-shell.component.html`
- Create: `src/app/shell/desktop-shell/desktop-shell.component.scss`
- Test: `src/app/shell/desktop-shell/desktop-shell.component.spec.ts`

**Interfaces:**
- Consumes: `TopbarComponent` (Task 13), `DockComponent` (Task 14), `WindowComponent` (Task 12), `AppHostComponent` (Task 11), `WindowManagerService` (Task 1).
- Produces: `DesktopShellComponent`, selector `app-desktop-shell` — used by the root `App` component (Task 20).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shell/desktop-shell/desktop-shell.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { DesktopShellComponent } from './desktop-shell.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

describe('DesktopShellComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<DesktopShellComponent>>;
  let windowManager: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [DesktopShellComponent] });
    fixture = TestBed.createComponent(DesktopShellComponent);
    windowManager = TestBed.inject(WindowManagerService);
    fixture.detectChanges();
  });

  it('renders the topbar and dock', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-topbar')).toBeTruthy();
    expect(el.querySelector('app-dock')).toBeTruthy();
  });

  it('renders no windows when none are open', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-window').length).toBe(0);
  });

  it('renders an open window with its app content', () => {
    windowManager.open('notes', 'Notes');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-window').length).toBe(1);
    expect(el.querySelector('.content-list__heading')?.textContent).toContain('About Me');
  });

  it('does not render a minimized window', () => {
    windowManager.open('notes', 'Notes');
    windowManager.minimize(windowManager.windows()[0].id);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-window').length).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/desktop-shell/desktop-shell.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/shell/desktop-shell/desktop-shell.component.ts
import { Component, computed, inject } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { DockComponent } from '../dock/dock.component';
import { WindowComponent } from '../window/window.component';
import { AppHostComponent } from '../../apps/app-host/app-host.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-desktop-shell',
  imports: [TopbarComponent, DockComponent, WindowComponent, AppHostComponent],
  templateUrl: './desktop-shell.component.html',
  styleUrl: './desktop-shell.component.scss',
})
export class DesktopShellComponent {
  private readonly windowManager = inject(WindowManagerService);

  protected readonly openWindows = computed(() =>
    this.windowManager.windows().filter((win) => !win.minimized),
  );
}
```

```html
<!-- src/app/shell/desktop-shell/desktop-shell.component.html -->
<app-topbar />
@for (win of openWindows(); track win.id) {
  <app-window [state]="win">
    <app-host [appId]="win.appId" />
  </app-window>
}
<app-dock />
```

```scss
// src/app/shell/desktop-shell/desktop-shell.component.scss
:host {
  display: block;
  position: fixed;
  inset: 0;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/desktop-shell/desktop-shell.component.spec.ts --watch=false`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/shell/desktop-shell/
git commit -m "feat: add DesktopShellComponent composing topbar, windows, and dock"
```

---

### Task 17: MobileStatusBarComponent

**Files:**
- Create: `src/app/shell/mobile-status-bar/mobile-status-bar.component.ts`
- Create: `src/app/shell/mobile-status-bar/mobile-status-bar.component.html`
- Create: `src/app/shell/mobile-status-bar/mobile-status-bar.component.scss`
- Test: `src/app/shell/mobile-status-bar/mobile-status-bar.component.spec.ts`

**Interfaces:**
- Consumes: `ClockService` (Task 2).
- Produces: `MobileStatusBarComponent`, selector `app-mobile-status-bar` — used by `MobileShellComponent` (Task 19).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shell/mobile-status-bar/mobile-status-bar.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { MobileStatusBarComponent } from './mobile-status-bar.component';

describe('MobileStatusBarComponent', () => {
  it('renders a live clock and static signal/battery icons', () => {
    TestBed.configureTestingModule({ imports: [MobileStatusBarComponent] });
    const fixture = TestBed.createComponent(MobileStatusBarComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.mobile-status-bar__clock')?.textContent?.trim().length).toBeGreaterThan(0);
    expect(el.querySelectorAll('.mobile-status-bar__icon').length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/mobile-status-bar/mobile-status-bar.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/shell/mobile-status-bar/mobile-status-bar.component.ts
import { Component, computed, inject } from '@angular/core';
import { ClockService } from '../../core/clock/clock.service';

@Component({
  selector: 'app-mobile-status-bar',
  templateUrl: './mobile-status-bar.component.html',
  styleUrl: './mobile-status-bar.component.scss',
})
export class MobileStatusBarComponent {
  private readonly clock = inject(ClockService);

  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(
      this.clock.now(),
    ),
  );
}
```

```html
<!-- src/app/shell/mobile-status-bar/mobile-status-bar.component.html -->
<header class="mobile-status-bar">
  <span class="mobile-status-bar__clock">{{ formattedTime() }}</span>
  <div class="mobile-status-bar__icons">
    <svg class="mobile-status-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM6.4 14.9a8 8 0 0111.2 0l-1.6 1.6a5.8 5.8 0 00-8 0zM3 11.5a12.5 12.5 0 0118 0l-1.6 1.6a10.3 10.3 0 00-14.8 0z"
      />
    </svg>
    <svg class="mobile-status-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.4" />
      <rect x="4" y="9" width="12.5" height="6" rx="1" fill="currentColor" />
      <rect x="21" y="10" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  </div>
</header>
```

```scss
// src/app/shell/mobile-status-bar/mobile-status-bar.component.scss
.mobile-status-bar {
  height: var(--ios-status-bar-height);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 20px 6px;
  box-sizing: border-box;
  color: var(--text-primary);
  font-size: 15px;
  font-weight: 600;
}

.mobile-status-bar__icons {
  display: flex;
  gap: 6px;
}

.mobile-status-bar__icon {
  width: 18px;
  height: 18px;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/mobile-status-bar/mobile-status-bar.component.spec.ts --watch=false`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/app/shell/mobile-status-bar/
git commit -m "feat: add MobileStatusBarComponent with iOS-accurate height"
```

---

### Task 18: MobileHomeScreenComponent

**Files:**
- Create: `src/app/shell/mobile-home-screen/mobile-home-screen.component.ts`
- Create: `src/app/shell/mobile-home-screen/mobile-home-screen.component.html`
- Create: `src/app/shell/mobile-home-screen/mobile-home-screen.component.scss`
- Test: `src/app/shell/mobile-home-screen/mobile-home-screen.component.spec.ts`

**Interfaces:**
- Consumes: `DOCK_APPS` (Task 4), `AppIconComponent` (Task 6), `WindowManagerService` (Task 1).
- Produces: `MobileHomeScreenComponent`, selector `app-mobile-home-screen` — used by `MobileShellComponent` (Task 19).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shell/mobile-home-screen/mobile-home-screen.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { MobileHomeScreenComponent } from './mobile-home-screen.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

describe('MobileHomeScreenComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<MobileHomeScreenComponent>>;
  let windowManager: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MobileHomeScreenComponent] });
    fixture = TestBed.createComponent(MobileHomeScreenComponent);
    windowManager = TestBed.inject(WindowManagerService);
    fixture.detectChanges();
  });

  it('splits apps between the pinned dock row and the grid', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.mobile-home__dock .mobile-home__icon').length).toBe(4);
    expect(el.querySelectorAll('.mobile-home__grid .mobile-home__icon').length).toBe(4);
  });

  it('opens the app window when an icon is tapped', () => {
    const openSpy = vi.spyOn(windowManager, 'open');
    const el = fixture.nativeElement as HTMLElement;
    const notesIcon = el.querySelector<HTMLButtonElement>('.mobile-home__icon[aria-label="Notes"]')!;
    notesIcon.click();
    expect(openSpy).toHaveBeenCalledWith('notes', 'Notes');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/mobile-home-screen/mobile-home-screen.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/shell/mobile-home-screen/mobile-home-screen.component.ts
import { Component, inject } from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-mobile-home-screen',
  imports: [AppIconComponent],
  templateUrl: './mobile-home-screen.component.html',
  styleUrl: './mobile-home-screen.component.scss',
})
export class MobileHomeScreenComponent {
  private readonly windowManager = inject(WindowManagerService);

  protected readonly pinnedApps = DOCK_APPS.filter((app) => app.pinnedMobile);
  protected readonly gridApps = DOCK_APPS.filter((app) => !app.pinnedMobile);

  open(app: DockAppDef): void {
    this.windowManager.open(app.id, app.label);
  }
}
```

```html
<!-- src/app/shell/mobile-home-screen/mobile-home-screen.component.html -->
<div class="mobile-home">
  <div class="mobile-home__grid">
    @for (app of gridApps; track app.id) {
      <button type="button" class="mobile-home__icon" [attr.aria-label]="app.label" (click)="open(app)">
        <app-icon [icon]="app.icon" />
        <span class="mobile-home__label">{{ app.label }}</span>
      </button>
    }
  </div>
  <div class="mobile-home__dock">
    @for (app of pinnedApps; track app.id) {
      <button type="button" class="mobile-home__icon" [attr.aria-label]="app.label" (click)="open(app)">
        <app-icon [icon]="app.icon" />
      </button>
    }
  </div>
</div>
```

```scss
// src/app/shell/mobile-home-screen/mobile-home-screen.component.scss
.mobile-home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  padding: 24px 20px;
}

.mobile-home__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.mobile-home__dock {
  display: flex;
  justify-content: space-around;
  padding: 12px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.mobile-home__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 56px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

.mobile-home__icon app-icon {
  width: 56px;
  height: 56px;
  display: block;
}

.mobile-home__dock .mobile-home__icon app-icon {
  width: 48px;
  height: 48px;
}

.mobile-home__label {
  font-size: 11px;
  color: var(--text-primary);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/mobile-home-screen/mobile-home-screen.component.spec.ts --watch=false`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/shell/mobile-home-screen/
git commit -m "feat: add MobileHomeScreenComponent with grid + pinned dock row"
```

---

### Task 19: MobileShellComponent

**Files:**
- Create: `src/app/shell/mobile-shell/mobile-shell.component.ts`
- Create: `src/app/shell/mobile-shell/mobile-shell.component.html`
- Create: `src/app/shell/mobile-shell/mobile-shell.component.scss`
- Test: `src/app/shell/mobile-shell/mobile-shell.component.spec.ts`

**Interfaces:**
- Consumes: `MobileStatusBarComponent` (Task 17), `MobileHomeScreenComponent` (Task 18), `AppHostComponent` (Task 11), `WindowManagerService` (Task 1).
- Produces: `MobileShellComponent`, selector `app-mobile-shell` — used by the root `App` component (Task 20).

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shell/mobile-shell/mobile-shell.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { MobileShellComponent } from './mobile-shell.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

describe('MobileShellComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<MobileShellComponent>>;
  let windowManager: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MobileShellComponent] });
    fixture = TestBed.createComponent(MobileShellComponent);
    windowManager = TestBed.inject(WindowManagerService);
    fixture.detectChanges();
  });

  it('shows the home screen when no app is open', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-mobile-home-screen')).toBeTruthy();
    expect(el.querySelector('app-host')).toBeFalsy();
  });

  it('shows the frontmost app full-screen with a back button once opened', () => {
    windowManager.open('notes', 'Notes');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-mobile-home-screen')).toBeFalsy();
    expect(el.querySelector('app-host')).toBeTruthy();
    expect(el.querySelector('.mobile-shell__back')).toBeTruthy();
  });

  it('closes the open app and returns to the home screen on back', () => {
    windowManager.open('notes', 'Notes');
    fixture.detectChanges();
    const backButton = fixture.nativeElement.querySelector<HTMLButtonElement>(
      '.mobile-shell__back',
    )!;
    backButton.click();
    fixture.detectChanges();
    expect(windowManager.windows().length).toBe(0);
    expect(fixture.nativeElement.querySelector('app-mobile-home-screen')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `nvm use 24 && npx ng test --include src/app/shell/mobile-shell/mobile-shell.component.spec.ts --watch=false`
Expected: FAIL — component does not exist yet.

- [ ] **Step 3: Implement the component**

```ts
// src/app/shell/mobile-shell/mobile-shell.component.ts
import { Component, computed, inject } from '@angular/core';
import { MobileStatusBarComponent } from '../mobile-status-bar/mobile-status-bar.component';
import { MobileHomeScreenComponent } from '../mobile-home-screen/mobile-home-screen.component';
import { AppHostComponent } from '../../apps/app-host/app-host.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-mobile-shell',
  imports: [MobileStatusBarComponent, MobileHomeScreenComponent, AppHostComponent],
  templateUrl: './mobile-shell.component.html',
  styleUrl: './mobile-shell.component.scss',
})
export class MobileShellComponent {
  private readonly windowManager = inject(WindowManagerService);

  protected readonly frontmost = computed(() => this.windowManager.frontmost());

  back(): void {
    const current = this.frontmost();
    if (current) {
      this.windowManager.close(current.id);
    }
  }
}
```

```html
<!-- src/app/shell/mobile-shell/mobile-shell.component.html -->
<div class="mobile-shell">
  <app-mobile-status-bar />
  @if (frontmost(); as win) {
    <div class="mobile-shell__app">
      <button type="button" class="mobile-shell__back" (click)="back()">‹ Back</button>
      <app-host [appId]="win.appId" />
    </div>
  } @else {
    <app-mobile-home-screen />
  }
</div>
```

```scss
// src/app/shell/mobile-shell/mobile-shell.component.scss
:host {
  display: block;
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.mobile-shell__app {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.mobile-shell__back {
  align-self: flex-start;
  margin: 8px 12px;
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  background: var(--surface-secondary);
  color: var(--text-primary);
  font-size: 15px;
  cursor: pointer;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `nvm use 24 && npx ng test --include src/app/shell/mobile-shell/mobile-shell.component.spec.ts --watch=false`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/shell/mobile-shell/
git commit -m "feat: add MobileShellComponent (home screen / full-screen app + back)"
```

---

### Task 20: Wire the root App component

**Files:**
- Modify: `src/app/app.ts`
- Modify: `src/app/app.html`
- Modify: `src/app/app.spec.ts`

**Interfaces:**
- Consumes: `BreakpointService` (Task 3), `WallpaperComponent` (Task 15), `DesktopShellComponent` (Task 16), `MobileShellComponent` (Task 19).

- [ ] **Step 1: Update the failing/changed tests**

Replace the "renders a blank page" expectation — the app now renders real content — and add a breakpoint-driven shell-selection test.

```ts
// src/app/app.spec.ts
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { vi } from 'vitest';
import { logEvent } from 'firebase/analytics';
import { App } from './app';
import { BreakpointService } from './core/breakpoint/breakpoint.service';

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(() => Promise.resolve(true)),
  logEvent: vi.fn(),
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

describe('App', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the desktop shell when not mobile', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-desktop-shell')).toBeTruthy();
    expect(el.querySelector('app-mobile-shell')).toBeFalsy();
  });

  it('renders the mobile shell when the breakpoint service reports mobile', () => {
    TestBed.overrideProvider(BreakpointService, {
      useValue: { isMobile: () => true },
    });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-mobile-shell')).toBeTruthy();
    expect(el.querySelector('app-desktop-shell')).toBeFalsy();
  });

  it('renders the wallpaper behind either shell', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('app-wallpaper')).toBeTruthy();
  });

  it('should log a page_view analytics event on startup', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(logEvent).toHaveBeenCalledWith(
      expect.anything(),
      'page_view',
      expect.objectContaining({ page_path: expect.any(String) }),
    );
  });
});
```

- [ ] **Step 2: Run tests to verify the shell-selection tests fail**

Run: `nvm use 24 && npx ng test --include src/app/app.spec.ts --watch=false`
Expected: FAIL — `app.ts`/`app.html` don't render any shell yet.

- [ ] **Step 3: Wire the shells into the root component**

```ts
// src/app/app.ts
import { Component, afterNextRender, inject } from '@angular/core';
import { getFirebaseApp } from './core/firebase-app';
import { BreakpointService } from './core/breakpoint/breakpoint.service';
import { WallpaperComponent } from './shell/wallpaper/wallpaper.component';
import { DesktopShellComponent } from './shell/desktop-shell/desktop-shell.component';
import { MobileShellComponent } from './shell/mobile-shell/mobile-shell.component';

@Component({
  selector: 'app-root',
  imports: [WallpaperComponent, DesktopShellComponent, MobileShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isMobile = inject(BreakpointService).isMobile;

  constructor() {
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
}
```

```html
<!-- src/app/app.html -->
<app-wallpaper />
@if (isMobile()) {
  <app-mobile-shell />
} @else {
  <app-desktop-shell />
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `nvm use 24 && npx ng test --include src/app/app.spec.ts --watch=false`
Expected: PASS (5 tests).

- [ ] **Step 5: Run the full test suite**

Run: `nvm use 24 && npx ng test --watch=false`
Expected: PASS — every spec file from Tasks 1–20 green.

- [ ] **Step 6: Manual smoke check**

Run: `nvm use 24 && npm start`, open the printed local URL in a browser.
Expected: wallpaper visible, topbar with live clock at the top, dock at the bottom with 8 icons; clicking an icon opens a draggable/resizable window with placeholder content; resizing the browser below 767px width swaps to the iOS-style home screen.

- [ ] **Step 7: Commit**

```bash
git add src/app/app.ts src/app/app.html src/app/app.spec.ts
git commit -m "feat: wire desktop/mobile shell selection into the root App component"
```

---

## Self-Review Notes

- **Spec coverage:** Topbar (logo/name/notch/wifi/battery/clock/toggle) → Task 13. Window manager (open/drag/resize/focus/minimize/close/multi-window) → Tasks 1 & 12. Dock with magnify + running indicator → Task 14. 8 apps with correct icon sourcing (real logos for VS Code/Photoshop/Figma/YouTube via `simple-icons`, original Apple-style icons for Notes/Mail/Safari/Finder) → Tasks 6, 7–11. Wallpaper (original, not a copyrighted Apple asset) → Task 15. Mobile iOS-like shell (status bar, home screen grid + pinned dock, full-screen app + back, no multi-window) → Tasks 17–19. Root wiring/breakpoint switch → Tasks 3 & 20. Placeholder, swappable data model → Task 5.
- **Placeholder scan:** No TBD/TODO left in any step; every code block is complete and runnable as written.
- **Type consistency:** `AppId` (Task 1) is the single source of truth threaded through `DockAppDef.id`/`.icon` (Task 4), `WindowState.appId` (Task 1), `AppIconComponent.icon` (Task 6), `AppHostComponent.appId` (Task 11), and `WindowManagerService.open(appId, title)` call sites (Tasks 10, 14, 18) — verified consistent across all tasks. `ListItem`/`GridItem` (Task 5) match the props consumed by `AppContentListComponent`/`AppContentGridComponent` (Tasks 7–8) exactly.
- **Scope:** This plan stops at a fully working, placeholder-content shell — real project/photo/video/design content is an intentionally separate follow-up pass per the spec's "Out of scope" section.
