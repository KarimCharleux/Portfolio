# Terminal app — design

**Date**: 2026-08-14
**Status**: implemented — see "Deviations found during implementation" at the end
**Scope**: build the Terminal dock app (`AppId: 'terminal'`), currently a `noWindow: true` stub.

The parent spec (`2026-08-10-macos-portfolio-design.md`) listed "Terminal app / interactive CLI
easter egg" as explicitly out of scope for the shell pass. This spec brings it into scope as its
own pass.

## Goal

A convincing macOS 26 Terminal.app running inside the existing window manager. The visitor types
real commands; a discoverable `help` lists them. Output is text only — the Terminal never drives
the desktop and never opens external links.

## Decisions taken (and what they rule out)

| Decision | Chosen | Ruled out |
| --- | --- | --- |
| Command scope | **Text output only** | Commands that open windows, toggle theme/lang, or open URLs |
| Mobile | **Real typing via the iOS keyboard** | A tappable command-chip UI; disabling the app on mobile |
| Command flavour | **Hybrid** — named verbs plus a few Unix classics | A real virtual filesystem with `cd`/path completion |
| Appearance | **Always dark translucent glass** | Following the site's light/dark toggle |
| Content | **Reuse existing content data; placeholders elsewhere** | Terminal-only duplicated content; collecting real content now |

The "text only" decision is load-bearing: it keeps the command runner a pure function with zero
dependency on `WindowManagerService`, `ThemeService` or `Router` — the runner is a plain function
from a string to lines.

## Architecture

Four new files plus three edits to existing ones. Layer direction is preserved: `content` imports
only from `core/i18n`, `apps` imports from `core` and `content`, nothing imports upward.

```
src/app/content/
  terminal.model.ts           TerminalTone, TerminalSegment, TerminalLine, TerminalCommand, CommandContext
  terminal-commands.data.ts   COMMANDS registry + runCommand() pure function
  skills.data.ts              placeholder tech-stack entries feeding `skills`
src/app/apps/terminal-app/
  terminal-app.component.ts
  terminal-app.component.html
  terminal-app.component.scss
```

Edited: `core/dock-apps/dock-apps.data.ts`, `apps/app-host/app-host.component.ts`,
`core/i18n/translations.ts`, `shell/design-tokens.scss`.

### Why no `core/terminal/` service

A terminal session is per-window state with a lifetime equal to the window's, not an application
singleton. A `providedIn: 'root'` service would leak scrollback across a close/reopen cycle and
would be shared if the window manager ever allowed two Terminal windows. Session state therefore
lives in the component as signals. The part worth extracting — turning an input string into output
lines — has no state at all, so it is a pure function in the data layer.

This also keeps `content/` legal: `terminal-commands.data.ts` imports sibling content data and
`core/i18n`, exactly as `notes.data.ts` already does. A `core/terminal/` service reading
`CODE_PROJECTS` would invert the layer rule.

## Data model

```ts
export type TerminalTone = 'default' | 'dim' | 'accent' | 'success' | 'error' | 'heading';

export interface TerminalSegment {
  text: string;
  tone: TerminalTone;
}

/** One rendered row of scrollback. An empty `segments` array renders a blank line. */
export interface TerminalLine {
  id: string;
  segments: TerminalSegment[];
}

export interface CommandContext {
  lang: Lang;
  /** Past commands, oldest first — `history` reads this. */
  history: readonly string[];
  /** Passed in, never read via `new Date()` inside a command — keeps commands pure. */
  now: Date;
  locale: string;
}

export interface TerminalCommand {
  /** Typed name. Stays English in both locales — it is a command, not prose. */
  name: string;
  /** Translated one-line summary; `help` renders this column. */
  descriptionKey: TranslationKey;
  /** Pure: same inputs, same lines. `null` means "clear the scrollback". */
  run(args: readonly string[], ctx: CommandContext): TerminalLine[] | null;
}
```

`run` returning `null` is how `clear` expresses itself without the runner needing a special case or
a side channel. Every other command returns lines.

Line ids are assigned by the component from a monotonic counter, not by the commands — commands
return segment groups and the component stamps ids. This keeps `@for` `track` stable and keeps the
command functions free of any id-generation state, preserving purity.

### The registry and `runCommand`

```ts
export const COMMANDS: readonly TerminalCommand[] = [ /* ... */ ];

export function runCommand(input: string, ctx: CommandContext): TerminalLine[] | null;
```

`runCommand` trims the input, splits on whitespace, looks the verb up in `COMMANDS`, and delegates.
An empty input returns an empty array (a bare prompt echo, no output — as a real shell does). An
unknown verb returns the authentic zsh error, in `error` tone:

```
zsh: command not found: xyz
```

`help` is generated **by iterating `COMMANDS`**. There is no second hand-maintained list. Adding a
command to the registry adds its row to `help` automatically; this is the single-source-of-truth
rule the project already applies to `AppId`.

## Command set

Fourteen commands plus the not-found path.

| Command | Behaviour | Source |
| --- | --- | --- |
| `help` | Two-column table: name, translated description | `COMMANDS` |
| `about` | Bio lines | `NOTES[lang]` |
| `projects` | Code projects, title + subtitle | `CODE_PROJECTS[lang]` |
| `skills` | Tech stack grouped by category | `SKILLS[lang]` (new, placeholder) |
| `contact` | Social links, label + URL as plain text | `SOCIAL_LINKS[lang]` |
| `ls` | Portfolio sections as a spaced row, e.g. `about  projects  skills  contact` | static list of the content-bearing command names |
| `neofetch` | Original ASCII monogram beside system-info rows | static + `TRANSLATIONS` |
| `whoami` | `karim` | static |
| `pwd` | `/Users/karim` | static |
| `date` | Localised date/time | `ctx.now` + `ctx.locale` |
| `echo` | Echoes its arguments verbatim | args |
| `history` | Numbered past commands | `ctx.history` |
| `clear` | Wipes scrollback (returns `null`) | — |
| `sudo` | Easter egg, `error` tone | `TRANSLATIONS` |

`contact` prints URLs as inert text. Making them clickable was explicitly ruled out — a real
terminal does not hyperlink, and the visitor has Safari in the dock for links.

`neofetch`'s ASCII art is an original monogram. Per the project's icon rule, it must not reproduce
the Apple logo or any Apple-owned artwork.

### Localisation

Command names, `whoami`/`pwd` output, the zsh error string and the prompt are locale-independent —
they are system strings, and translating them would break the illusion. Everything a human reads as
prose (command descriptions, `about`, `skills` labels, `neofetch` field names, the `sudo` joke, the
help header, the hint line) goes through `TRANSLATIONS` with both `en` and `fr` values.

## macOS 26 fidelity

macOS 26 (Tahoe) gave Terminal.app its first real redesign: the Liquid Glass aesthetic, redesigned
themes, 24-bit colour and Powerline font support. The fidelity targets below follow from that plus
Terminal.app's long-standing defaults.

- **Window size**: Terminal.app's default profile is **80 columns × 24 rows**. The window opens at
  that size, computed from the glyph advance rather than rounded by eye: SF Mono's advance is
  `0.6em`, so at a 13px font the content box is `80 × 7.8px = 624px` wide and
  `24 × (13 × 1.45) = 452px` tall, plus the body padding and the 28px title bar. The derivation
  lives in a comment next to the constant — a bare `652` would violate the "never eyeballed" rule.
- **Font**: `ui-monospace, 'SF Mono', Menlo, monospace`. SF Mono is Terminal.app's real face; Menlo
  is the pre-Catalina default and the right fallback.
- **Background**: dark translucent glass in both site themes, built from `_glass.scss` plus new
  `--terminal-*` tokens in `design-tokens.scss`. Declared once outside the theme blocks, since it
  does not vary by theme.
- **Banner**: `Last login: <weekday> <mon> <d> <HH:MM:SS> on ttys000`, the real login line.
- **Prompt**: `karim@karimagine ~ %` — zsh's `%`, the macOS default shell since Catalina.
- **Cursor**: blinking block, the Terminal.app default.
- **Selection**: tinted selection colour rather than the browser default.

### The `help` hint

Below the login banner, one line in `dim` tone points at `help`, with the word itself in `accent`
tone so the eye lands on it:

```
Last login: Thu Aug 14 10:23:45 on ttys000

  Tapez help pour découvrir les commandes disponibles.

karim@karimagine ~ % ▊
```

Deliberately understated: lowercase sentence, no box, no banner art, no exclamation mark, no arrow.
It reads as a shell MOTD, not as onboarding UI. It scrolls away with the rest of the scrollback and
is not reprinted; `clear` removes it like any other line.

## Interaction

State lives in the component as signals:

| Signal | Purpose |
| --- | --- |
| `#lines` | scrollback, seeded with banner + hint |
| `#draft` | current input text |
| `#history` | submitted commands, oldest first |
| `#historyIndex` | cursor into history; `-1` means "editing a fresh line" |

Input is a real `<input>` overlaid on the prompt line with `caret-color: transparent` and
transparent text; the visible text and block cursor are rendered from `#draft`. It must never be
`display: none` or `hidden` — the iOS keyboard only appears for a focusable, rendered field. A click
anywhere in the terminal body focuses it.

| Key | Effect |
| --- | --- |
| `Enter` | echo the prompt line, run, append output, push to history, reset `#historyIndex` |
| `ArrowUp` / `ArrowDown` | walk history; past the newest entry restores the draft |
| `Tab` | complete a unique command-name prefix; ambiguous prefixes print the candidates, as a shell does |
| `Ctrl+L` | same as `clear` |

Scrollback auto-scrolls to the bottom after each command. Scroll manipulation touches the DOM, so it
runs inside `afterNextRender` / an `isPlatformBrowser` guard — the site is prerendered and an
unguarded `document` access breaks the build.

### Mobile

The same component, unchanged. The invisible-input approach means the iOS keyboard works with no
mobile-specific branch. The one real concern is the keyboard covering the prompt: the terminal body
scrolls to bottom on focus so the prompt stays visible above the keyboard.

## Accessibility

The baseline is 100/100 Lighthouse Accessibility, and this app must not cost it.

- The scrollback is `role="log"` with `aria-live="polite"`, so output is announced as it appears
  without stealing focus.
- The input carries a translated `aria-label` — never a bare unlabelled field.
- Every `TerminalTone` colour is checked for WCAG AA contrast against the dark glass background.
  The glass is translucent, so contrast is verified against the darkest realistic backdrop, not
  against an idealised opaque colour.
- The blinking cursor is CSS-only and respects `prefers-reduced-motion: reduce` by rendering solid.

## Wiring

1. Remove `noWindow: true` from the `terminal` entry in `DOCK_APPS` so clicking the dock icon opens
   a window. `AppId` and the dock entry already exist; no new id is introduced.
2. Add `@else if (appId() === 'terminal')` to `AppHostComponent`'s template. The existing
   `LIST_SOURCES` / `GRID_SOURCES` tables do not apply — the Terminal is a custom UI like
   `FinderAppComponent`.
3. Open the window at the 80×24 size via the existing `open(appId, titleKey, { width, height })`
   options.

## Testing

**No `.spec.ts` files** — decided explicitly for this pass, overriding the TDD convention stated in
`CLAUDE.md` and the original build plan. Verification is manual: open the window, run every command
in both locales, check the Lighthouse score.

The design still keeps the command runner pure and takes `now` through `CommandContext` rather than
calling `new Date()` inside a command. That is not test scaffolding — it is what keeps a command a
function of its inputs, which is why `help` can be generated from the registry and why a command
cannot quietly depend on ambient state.

## Manual verification checklist

- every command runs in `fr` and in `en`
- unknown input prints `zsh: command not found: <verb>`
- `clear` and `Ctrl+L` empty the scrollback, hint line included
- ArrowUp/ArrowDown walk history and restore the in-progress draft past the newest entry
- Tab completes a unique prefix; an ambiguous prefix lists candidates
- the iOS keyboard opens on tap and the prompt stays visible above it
- the production build still prerenders (no unguarded `window`/`document`)
- Lighthouse Accessibility stays at 100

## Out of scope

- Piping, redirection, chained commands, quoting rules
- A virtual filesystem, `cd`, or path completion
- Command output that changes the desktop, the theme, the language, or opens URLs
- Multiple Terminal windows or tabs
- Real content for `skills` and `neofetch` — placeholders here, filled in the content pass alongside
  the other apps

## Deviations found during implementation

Recorded because each one changes something the spec above asserts.

- **`run` returns `TerminalRow[]`, not `TerminalLine[]`.** The spec said commands return lines but
  that the component stamps the ids — which cannot both be true. Rows carry no id; the component
  turns them into `TerminalLine`s. Same intent, coherent types.
- **Line height is 1.25, not 1.45**, and the window is **648 x 442**, not 648 x 505. 1.45 is loose
  for a terminal (Terminal.app sits nearer 1.2) and it opened visible gaps between the rows of the
  `neofetch` monogram. The 80x24 derivation is unchanged; only the multiplier moved.
- **The monogram is full blocks and spaces only.** The first version used box-drawing characters,
  which fall back to a different font here — the mismatched advance width sheared the letter apart.
- **The prompt takes focus on open.** Not in the spec, but a terminal that needs a click before it
  accepts typing is wrong; `afterNextRender` focuses the input.
- **The terminal blurs its own backdrop.** The spec assumed the window's blur was enough. It is on
  desktop, but the mobile shell has no window around the app, so the wallpaper read straight through
  the translucent fill.
- **`viewChild` queries are `protected`, not `#private`.** Angular rejects signal queries on ES
  private fields (NG1053), so the project's `#field` rule cannot apply to them.
- **Window sizing moved into `WindowManagerService`.** `DockAppDef` gained an optional `windowSize`,
  resolved centrally, so the dock, the mobile home screen and Finder all open an app at its intended
  size without any of them knowing which apps have one.

### Pre-existing bugs found and fixed

Both were latent before this work and affected every app, not just the Terminal.

- **Mobile apps collapsed to content height.** `div.mobile-shell` had no flex sizing of its own, so
  it stretched horizontally but not vertically, and every app root's `height: 100%` resolved against
  an auto-height parent. Fixed in `mobile-shell.component.scss`.
- **`app-host` had no height on mobile** for the same reason, one level down.

### Known accessibility gap (not introduced here)

With any window open, Lighthouse Accessibility drops to ~95 on `target-size`: the traffic-light
buttons are 14px where WCAG 2.5.8 wants 24px. This is the pixel-accurate macOS measurement the
design spec mandates, and it predates the Terminal — a Notes window alone scores 95, slightly worse
than the Terminal's 96. The page with no window open still scores 100, which is why the documented
baseline never surfaced it. Fixing it means expanding the hit area while keeping the 14px dot.

## Sources

- [Apple's Terminal App Gets Colorful Redesign in macOS Tahoe — MacRumors](https://www.macrumors.com/2025/06/16/apples-terminal-app-macos-tahoe/)
- [50 New macOS Tahoe Features and Changes — MacRumors](https://www.macrumors.com/2025/09/24/all-the-new-macos-tahoe-features/)
