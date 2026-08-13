import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ClockService } from '../../core/clock/clock.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-mobile-status-bar',
  templateUrl: './mobile-status-bar.component.html',
  styleUrl: './mobile-status-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileStatusBarComponent {
  readonly #clock = inject(ClockService);
  protected readonly i18n = inject(I18nService);

  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(this.i18n.lang() === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(this.#clock.now()),
  );

  toggleLang(): void {
    this.i18n.toggle();
  }
}
