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
