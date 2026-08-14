# Terminal app — design

**Date**: 2026-08-14
**Status**: approved, ready for planning
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
dependency on `WindowManagerService`, `ThemeService` or `Router`, which is what makes it testable
without `TestBed`.

## Architecture

Four new files plus three edits to existing ones. Layer direction is preserved: `content` imports
only from `core/i18n`, `apps` imports from `core` and `content`, nothing imports upward.

```
src/app/content/
  terminal.model.ts           TerminalTone, TerminalSegment, TerminalLine, TerminalCommand, CommandContext
  terminal-commands.data.ts   COMMANDS registry + runCommand() pure function
  terminal-commands.spec.ts   pure spec for the registry and runCommand()
  skills.data.ts              placeholder tech-stack entries feeding `skills`
src/app/apps/terminal-app/
  terminal-app.component.ts
  terminal-app.component.html
  terminal-app.component.scss
  terminal-app.component.spec.ts
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
  /** Injected so `date` stays deterministic under test. */
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

Two spec files, following the plan's TDD convention.

`terminal-commands.spec.ts` — pure, no `TestBed`:
- one `it` per command asserting its output lines
- `help` lists every entry in `COMMANDS` (guards against a command that forgets its description)
- unknown input produces the zsh not-found line in `error` tone
- `clear` returns `null`
- empty and whitespace-only input produce no output
- `date` is asserted against an injected fixed `ctx.now`, so it cannot flake
- every command's output is asserted in both `en` and `fr`

`terminal-app.component.spec.ts` — `TestBed`:
- Enter appends the echoed prompt line and the output
- ArrowUp/ArrowDown walk history and restore the draft past the newest entry
- Tab completes a unique prefix and lists candidates for an ambiguous one
- `clear` and Ctrl+L empty the scrollback
- the hint line is present on first render and gone after `clear`

## Out of scope

- Piping, redirection, chained commands, quoting rules
- A virtual filesystem, `cd`, or path completion
- Command output that changes the desktop, the theme, the language, or opens URLs
- Multiple Terminal windows or tabs
- Real content for `skills` and `neofetch` — placeholders here, filled in the content pass alongside
  the other apps

## Sources

- [Apple's Terminal App Gets Colorful Redesign in macOS Tahoe — MacRumors](https://www.macrumors.com/2025/06/16/apples-terminal-app-macos-tahoe/)
- [50 New macOS Tahoe Features and Changes — MacRumors](https://www.macrumors.com/2025/09/24/all-the-new-macos-tahoe-features/)
