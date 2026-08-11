import { Component, inject } from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-mobile-home-screen',
  imports: [AppIconComponent],
  templateUrl: './mobile-home-screen.component.html',
  styleUrl: './mobile-home-screen.component.scss',
})
export class MobileHomeScreenComponent {
  private readonly windowManager = inject(WindowManagerService);

  protected readonly pinnedApps = DOCK_APPS.filter((app) => app.pinnedMobile);
  protected readonly gridApps = DOCK_APPS.filter((app) => !app.pinnedMobile);

  open(app: DockAppDef): void {
    if (app.noWindow) return;
    this.windowManager.open(app.id, app.label);
  }
}
