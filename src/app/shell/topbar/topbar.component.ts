import { Component, computed, inject } from '@angular/core';
import { ClockService } from '../../core/clock/clock.service';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { ThemeService } from '../../core/theme/theme.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private readonly clock = inject(ClockService);
  private readonly windowManager = inject(WindowManagerService);
  private readonly theme = inject(ThemeService);
  protected readonly i18n = inject(I18nService);

  protected readonly darkMode = this.theme.isDark;

  protected readonly activeAppName = computed(
    () => this.windowManager.frontmost()?.title ?? 'Karim Charleux',
  );

  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(this.i18n.lang() === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(this.clock.now()),
  );

  toggleTheme(): void {
    this.theme.toggle();
  }

  toggleLang(): void {
    this.i18n.toggle();
  }

  openAbout(): void {
    this.windowManager.open('about', this.i18n.t('aboutPortfolio'), {
      width: 380,
      height: 540,
      centered: true,
    });
  }
}
