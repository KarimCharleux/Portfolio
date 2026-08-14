import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AppId } from '../../core/window-manager/window.model';
import { ListItem, GridItem } from '../../content/content.model';
import { AppContentListComponent } from '../app-content-list/app-content-list.component';
import { AppContentGridComponent } from '../app-content-grid/app-content-grid.component';
import { FinderAppComponent } from '../finder-app/finder-app.component';
import { AboutPortfolioComponent } from '../about-portfolio/about-portfolio.component';
import { NOTES } from '../../content/notes.data';
import { CODE_PROJECTS } from '../../content/code-projects.data';
import { SOCIAL_LINKS } from '../../content/social-links.data';
import { PHOTOS } from '../../content/photos.data';
import { DESIGNS } from '../../content/designs.data';
import { VIDEOS } from '../../content/videos.data';
import { I18nService } from '../../core/i18n/i18n.service';
import { Lang, TranslationKey } from '../../core/i18n/translations';

const LIST_SOURCES: Partial<
  Record<AppId, { headingKey: TranslationKey; source: Record<Lang, ListItem[]> }>
> = {
  notes: { headingKey: 'aboutMe', source: NOTES },
  vscode: { headingKey: 'codeProjects', source: CODE_PROJECTS },
  safari: { headingKey: 'links', source: SOCIAL_LINKS },
};

const GRID_SOURCES: Partial<
  Record<AppId, { headingKey: TranslationKey; source: Record<Lang, GridItem[]> }>
> = {
  photoshop: { headingKey: 'photos', source: PHOTOS },
  figma: { headingKey: 'designWork', source: DESIGNS },
  youtube: { headingKey: 'videoProjects', source: VIDEOS },
};

@Component({
  selector: 'app-host',
  imports: [
    AppContentListComponent,
    AppContentGridComponent,
    FinderAppComponent,
    AboutPortfolioComponent,
  ],
  template: `
    @if (appId() === 'finder') {
      <app-finder />
    } @else if (appId() === 'about') {
      <app-about-portfolio />
    } @else if (listContent(); as list) {
      <app-content-list [heading]="list.heading" [items]="list.items" />
    } @else if (gridContent(); as grid) {
      <app-content-grid [heading]="grid.heading" [items]="grid.items" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHostComponent {
  readonly #i18n = inject(I18nService);

  readonly appId = input.required<AppId>();

  protected readonly listContent = computed(() => {
    const entry = LIST_SOURCES[this.appId()];
    if (!entry) return null;
    return { heading: this.#i18n.t(entry.headingKey), items: entry.source[this.#i18n.lang()] };
  });

  protected readonly gridContent = computed(() => {
    const entry = GRID_SOURCES[this.appId()];
    if (!entry) return null;
    return { heading: this.#i18n.t(entry.headingKey), items: entry.source[this.#i18n.lang()] };
  });
}
