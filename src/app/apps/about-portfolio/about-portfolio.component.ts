import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-about-portfolio',
  templateUrl: './about-portfolio.component.html',
  styleUrl: './about-portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPortfolioComponent {
  protected readonly i18n = inject(I18nService);
  readonly #windowManager = inject(WindowManagerService);

  protected readonly year = new Date().getFullYear();

  openMoreInfo(): void {
    this.#windowManager.open('finder', 'Finder');
  }
}
