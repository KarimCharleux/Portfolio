import { Component, computed, inject } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { DockComponent } from '../dock/dock.component';
import { WindowComponent } from '../window/window.component';
import { AppHostComponent } from '../../apps/app-host/app-host.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-desktop-shell',
  imports: [TopbarComponent, DockComponent, WindowComponent, AppHostComponent],
  templateUrl: './desktop-shell.component.html',
  styleUrl: './desktop-shell.component.scss',
})
export class DesktopShellComponent {
  private readonly windowManager = inject(WindowManagerService);

  protected readonly openWindows = computed(() =>
    this.windowManager.windows().filter((win) => !win.minimized),
  );
}
