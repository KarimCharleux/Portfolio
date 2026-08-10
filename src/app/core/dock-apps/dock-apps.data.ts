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
