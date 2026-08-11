import { Component, computed, inject } from '@angular/core';
import { MobileStatusBarComponent } from '../mobile-status-bar/mobile-status-bar.component';
import { MobileHomeScreenComponent } from '../mobile-home-screen/mobile-home-screen.component';
import { AppHostComponent } from '../../apps/app-host/app-host.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-mobile-shell',
  imports: [MobileStatusBarComponent, MobileHomeScreenComponent, AppHostComponent],
  templateUrl: './mobile-shell.component.html',
  styleUrl: './mobile-shell.component.scss',
})
export class MobileShellComponent {
  private readonly windowManager = inject(WindowManagerService);
  protected readonly i18n = inject(I18nService);

  protected readonly frontmost = computed(() => this.windowManager.frontmost());

  back(): void {
    const current = this.frontmost();
    if (current) {
      this.windowManager.close(current.id);
    }
  }
}
