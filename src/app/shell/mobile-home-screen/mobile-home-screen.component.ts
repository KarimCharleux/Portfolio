import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { I18nService } from '../../core/i18n/i18n.service';

/**
 * Desktop-only props (Messages, Trash) open nothing anywhere; on a touch home screen a
 * tappable icon that does nothing reads as broken, so they're left off entirely.
 */
const MOBILE_APPS = DOCK_APPS.filter((app) => !app.noWindow || app.externalUrl);

@Component({
  selector: 'app-mobile-home-screen',
  imports: [AppIconComponent],
  templateUrl: './mobile-home-screen.component.html',
  styleUrl: './mobile-home-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHomeScreenComponent {
  readonly #windowManager = inject(WindowManagerService);
  protected readonly i18n = inject(I18nService);

  protected readonly pinnedApps = MOBILE_APPS.filter((app) => app.pinnedMobile);
  protected readonly gridApps = MOBILE_APPS.filter((app) => !app.pinnedMobile);

  open(app: DockAppDef): void {
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (app.noWindow) return;
    this.#windowManager.open(app.id, app.labelKey);
  }
}
