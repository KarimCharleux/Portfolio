import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AppId } from '../../core/window-manager/window.model';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrl: './app-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIconComponent {
  readonly #theme = inject(ThemeService);

  readonly icon = input.required<AppId>();

  protected readonly dark = this.#theme.isDark;
}
