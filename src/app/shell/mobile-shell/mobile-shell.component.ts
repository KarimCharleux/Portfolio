import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MobileStatusBarComponent } from '../mobile-status-bar/mobile-status-bar.component';
import { MobileHomeScreenComponent } from '../mobile-home-screen/mobile-home-screen.component';
import { AppHostComponent } from '../../apps/app-host/app-host.component';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { MobileNavService } from '../../core/mobile-nav/mobile-nav.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslationKey } from '../../core/i18n/translations';
import { AppId } from '../../core/window-manager/window.model';

/**
 * Apps whose content is dark in both themes. Like a real iOS app, their status and
 * navigation bars adopt the app's own background instead of a white strip above it.
 */
const DARK_CHROME_APPS: ReadonlySet<AppId> = new Set<AppId>(['terminal']);

@Component({
  selector: 'app-mobile-shell',
  imports: [MobileStatusBarComponent, MobileHomeScreenComponent, AppHostComponent],
  templateUrl: './mobile-shell.component.html',
  styleUrl: './mobile-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellComponent {
  readonly #windowManager = inject(WindowManagerService);
  readonly #mobileNav = inject(MobileNavService);
  protected readonly i18n = inject(I18nService);

  protected readonly frontmost = computed(() => this.#windowManager.frontmost());
  protected readonly darkChrome = computed(() => {
    const win = this.frontmost();
    return !!win && DARK_CHROME_APPS.has(win.appId);
  });
  protected readonly backLabelKey = computed<TranslationKey>(
    () => this.#mobileNav.level()?.backLabelKey ?? 'back',
  );

  back(): void {
    const level = this.#mobileNav.level();
    if (level) {
      level.back();
      return;
    }
    const current = this.frontmost();
    if (current) {
      this.#windowManager.close(current.id);
    }
  }
}
