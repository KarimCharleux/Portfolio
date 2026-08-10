# macOS-style portfolio — design

## Context

The blank Angular 22 shell (see `2026-08-10-angular22-rewrite-design.md`) is ready: standalone
components, zoneless change detection, SSR, Firebase Analytics wired, no portfolio content.
This spec covers the actual portfolio experience to build on top of it.

Inspiration: [yevtam.com](https://yevtam.com) — a one-page portfolio themed as a macOS desktop
(menu bar + dock, click a dock icon and the content swaps in). We're going further: a real
window manager (drag/resize/multi-window/minimize) rather than yevtam's full-screen content
swap, plus a real top menu bar with live clock and pixel-accurate macOS chrome.

**Hard constraint across the whole project: pixel-accurate fidelity to real macOS/iOS chrome.**
Traffic-light button sizing/spacing, notch geometry, title bar height, window corner radius,
menu bar height, iOS status bar layout — all sourced from real Apple measurements, not
approximated by eye. This governs every visual decision below.

## Scope

This spec covers **structure and interaction**, not final content. All app windows ship with
placeholder/stub data (see Data model). Populating real projects, photos, videos, and designs
is a separate follow-up pass once the shell works end-to-end.

## Desktop shell

### Top menu bar

Pixel-accurate macOS menu bar, three zones:

| Zone | Content |
|---|---|
| Left | Apple logo (placeholder, swapped later for a personal mark) + "Karim Charleux" acting as the active-app-name slot (macOS shows the frontmost app's name here) |
| Center | macOS notch — decorative, real notch geometry |
| Right | Wifi icon (static) · Battery icon (static) · Live clock (real time, ticking) · Dark/light toggle (sun/moon, immediate switch) |

Wifi/battery icons are non-interactive for this pass (no Control Center flyout). Clicking the
left-side name/logo area is out of scope for this pass (no "About This Portfolio" dropdown yet
— noted as a nice-to-have below).

### Window manager

Real, multi-window management — not a full-screen content swap:

- **Open**: clicking a dock icon spawns a window with a genie-like open animation (scale+fade
  from the dock icon's position)
- **Chrome**: pixel-accurate title bar with red/yellow/green traffic-light buttons (real size,
  spacing, hover states), window corner radius, drop shadow that intensifies on focus
- **Drag**: title bar is the drag handle; window position is clamped so it can't be dragged
  fully off-screen
- **Resize**: edge/corner handles, sensible min/max size per window
- **Focus/z-index**: clicking a window brings it to front; only the frontmost window shows the
  "active" shadow/title-bar treatment
- **Minimize**: yellow button shrinks the window back toward its dock icon (reverse genie); the
  dock shows a small dot under the icon while the app has an open window (minimized or not)
- **Close**: red button removes the window and clears the dock indicator
- **Multi-open**: several windows can be open and independently positioned at once
- **State**: window manager state (open windows, each with position/size/z-index/minimized
  flag) lives in Angular signals — no RxJS needed for this

### Dock

Fixed set of 8 apps for this pass:

| App | Icon style | Content (placeholder for now) |
|---|---|---|
| Notes | yellow, ruled lines | About me / bio / timeline |
| VS Code | blue | Code projects — custom UI, not a real VS Code UI clone |
| Photos | multicolor pinwheel | Photo gallery |
| Design app | purple/black (Figma-like) | Design/UI work |
| QuickTime / Video | gray/purple | Video projects |
| Mail | blue envelope | Contact form |
| Safari | blue compass | Social links |
| Finder | blue/gray face | Global index of all projects across categories |

Each app's window content is a **custom, simplified UI** inspired by the real app (not a
pixel clone of VS Code's or Notes' actual interface) — the window *chrome* is pixel-accurate
macOS, the window *content* is a portfolio-appropriate layout.

## Mobile shell (iOS-like)

Below ~768px, an entirely different shell renders — the desktop window-manager metaphor
doesn't work with touch:

- **Status bar**: iOS-accurate layout (time, wifi, battery), distinct from the macOS menu bar
  design (different geometry/icon set)
- **Home screen**: same 8 apps as a grid of icons; a subset (e.g. Notes, VS Code, Photos, Mail)
  sits in a pinned iOS-style dock row at the bottom, the rest in the scrollable grid above
- **Opening an app**: tap → full-screen (no drag/resize — one app at a time, like real iOS)
- **No multi-window** on mobile

`DesktopShellComponent` and `MobileShellComponent` are separate components selected via
`matchMedia`, but both render the same underlying app content components — only the chrome
around them differs.

## Data model

Each content category gets a TypeScript interface with placeholder/stub instances, so real
content later is a data swap, not a component rewrite:

```ts
interface Project { id: string; title: string; description: string; /* ...stub fields */ }
interface Photo { id: string; src: string; caption: string; }
interface DesignWork { id: string; title: string; image: string; }
interface Video { id: string; title: string; embedUrl: string; }
```

Placeholder data lives alongside each app component for now (no CMS/backend in scope here).

## Out of scope for this pass

- Real content: actual code projects, photos, videos, design work
- Spotlight-style search overlay (flagged as a nice-to-have, not required for the MVP shell)
- Terminal app / interactive CLI easter egg
- Functional Control Center (wifi/battery/bluetooth toggles) — icons stay decorative
- "About This Portfolio" dropdown from the top-left logo/name
- Ambient sound / soundtrack toggle
- Personal logo to replace the placeholder Apple logo

## Open questions carried forward (not blocking this spec)

- Exact personal logo to replace the Apple placeholder — TBD later by the user
- Whether Spotlight search gets built in a later pass
