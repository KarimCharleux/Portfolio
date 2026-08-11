import { DockAppDef } from './dock-app.model';

export const DOCK_APPS: DockAppDef[] = [
  { id: 'notes', label: 'Notes', icon: 'notes', pinnedMobile: true, tooltip: 'About Me' },
  { id: 'vscode', label: 'VS Code', icon: 'vscode', pinnedMobile: true, tooltip: 'Code Projects' },
  {
    id: 'photoshop',
    label: 'Photoshop',
    icon: 'photoshop',
    pinnedMobile: false,
    tooltip: 'Photos',
  },
  { id: 'figma', label: 'Figma', icon: 'figma', pinnedMobile: false, tooltip: 'Design Work' },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: 'youtube',
    pinnedMobile: false,
    tooltip: 'Video Projects',
  },
  { id: 'mail', label: 'Mail', icon: 'mail', pinnedMobile: true, tooltip: 'Get in Touch' },
  { id: 'safari', label: 'Safari', icon: 'safari', pinnedMobile: false, tooltip: 'Links' },
  { id: 'finder', label: 'Finder', icon: 'finder', pinnedMobile: true, tooltip: 'All Projects' },
];
