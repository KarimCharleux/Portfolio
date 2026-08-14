import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { AppId } from '../../core/window-manager/window.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslationKey } from '../../core/i18n/translations';
import { NOTES_COUNT } from '../../content/notes.data';
import { CODE_PROJECTS_COUNT } from '../../content/code-projects.data';
import { PHOTOS_COUNT } from '../../content/photos.data';
import { DESIGNS_COUNT } from '../../content/designs.data';
import { VIDEOS_COUNT } from '../../content/videos.data';
import { SOCIAL_LINKS_COUNT } from '../../content/social-links.data';

const CONTENT_COUNTS: Partial<Record<AppId, number>> = {
  notes: NOTES_COUNT,
  vscode: CODE_PROJECTS_COUNT,
  photoshop: PHOTOS_COUNT,
  figma: DESIGNS_COUNT,
  youtube: VIDEOS_COUNT,
  safari: SOCIAL_LINKS_COUNT,
};

@Component({
  selector: 'app-finder',
  templateUrl: './finder-app.component.html',
  styleUrl: './finder-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinderAppComponent {
  readonly #windowManager = inject(WindowManagerService);
  protected readonly i18n = inject(I18nService);

  protected readonly heading = computed(() => this.i18n.t('allProjects'));

  readonly categories = DOCK_APPS.filter((app) => app.id !== 'finder').map((app) => ({
    id: app.id,
    labelKey: app.labelKey,
    count: CONTENT_COUNTS[app.id] ?? 0,
  }));

  open(appId: AppId, labelKey: TranslationKey): void {
    this.#windowManager.open(appId, labelKey);
  }
}
