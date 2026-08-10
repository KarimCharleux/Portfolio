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
