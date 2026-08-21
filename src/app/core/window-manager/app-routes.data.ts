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
  return (Object.keys(APP_ROUTE_SLUGS) as AppId[]).find((appId) => APP_ROUTE_SLUGS[appId] === slug);
}
