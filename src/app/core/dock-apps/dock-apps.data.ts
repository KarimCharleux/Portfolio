import { DockAppDef } from './dock-app.model';

/**
 * Terminal.app's default profile is 80 columns by 24 rows, so the window opens
 * at exactly that rather than at a rounded guess. Derived from the type tokens
 * in `design-tokens.scss`:
 *
 *   width  = 80 cols x 13px x 0.6em advance (SF Mono) + 2 x 12px padding = 648
 *   height = 24 rows x (13px x 1.25 line-height) + 12px bottom padding
 *            + 28px title bar + 12px top padding                        = 442
 *
 * The title bar is absolutely positioned over the window body, so its 28px is
 * top padding on the terminal rather than extra height above it.
 *
 * Keep in step with `--terminal-font-size`, `--terminal-line-height` and
 * `--terminal-padding` — changing one of those invalidates these numbers.
 */
const TERMINAL_WINDOW = { width: 648, height: 442 };

export const DOCK_APPS: DockAppDef[] = [
  { id: 'notes', labelKey: 'dockNotes', icon: 'notes', pinnedMobile: true, tooltip: 'aboutMe' },
  {
    id: 'vscode',
    labelKey: 'dockVscode',
    icon: 'vscode',
    pinnedMobile: true,
    tooltip: 'codeProjects',
  },
  {
    id: 'photoshop',
    labelKey: 'dockPhotos',
    icon: 'photoshop',
    pinnedMobile: false,
    tooltip: 'photos',
  },
  { id: 'figma', labelKey: 'dockFigma', icon: 'figma', pinnedMobile: false, tooltip: 'designWork' },
  {
    id: 'youtube',
    labelKey: 'dockYoutube',
    icon: 'youtube',
    pinnedMobile: false,
    tooltip: 'videoProjects',
  },
  { id: 'safari', labelKey: 'dockSafari', icon: 'safari', pinnedMobile: false, tooltip: 'links' },
  {
    id: 'finder',
    labelKey: 'dockFinder',
    icon: 'finder',
    pinnedMobile: true,
    tooltip: 'allProjects',
  },
  {
    id: 'messages',
    labelKey: 'dockMessages',
    icon: 'messages',
    pinnedMobile: false,
    tooltip: 'messages',
    noWindow: true,
  },
  {
    id: 'terminal',
    labelKey: 'dockTerminal',
    icon: 'terminal',
    pinnedMobile: false,
    tooltip: 'terminal',
    windowSize: TERMINAL_WINDOW,
  },
  {
    id: 'trash',
    labelKey: 'dockTrash',
    icon: 'trash',
    pinnedMobile: false,
    tooltip: 'trash',
    noWindow: true,
    separatorBefore: true,
  },
];
