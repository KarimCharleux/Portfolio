import { DockAppDef } from './dock-app.model';

export const DOCK_APPS: DockAppDef[] = [
  { id: 'notes', label: 'Notes', icon: 'notes', pinnedMobile: true, tooltip: 'aboutMe' },
  { id: 'vscode', label: 'VS Code', icon: 'vscode', pinnedMobile: true, tooltip: 'codeProjects' },
  {
    id: 'photoshop',
    label: 'Photoshop',
    icon: 'photoshop',
    pinnedMobile: false,
    tooltip: 'photos',
  },
  { id: 'figma', label: 'Figma', icon: 'figma', pinnedMobile: false, tooltip: 'designWork' },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: 'youtube',
    pinnedMobile: false,
    tooltip: 'videoProjects',
  },
  { id: 'mail', label: 'Mail', icon: 'mail', pinnedMobile: true, tooltip: 'getInTouch' },
  { id: 'safari', label: 'Safari', icon: 'safari', pinnedMobile: false, tooltip: 'links' },
  { id: 'finder', label: 'Finder', icon: 'finder', pinnedMobile: true, tooltip: 'allProjects' },
];
