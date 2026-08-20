import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClockService } from '../../core/clock/clock.service';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { ThemeService } from '../../core/theme/theme.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { CursorService } from '../../core/cursor/cursor.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  readonly #clock = inject(ClockService);
  readonly #windowManager = inject(WindowManagerService);
  readonly #theme = inject(ThemeService);
  readonly #cursor = inject(CursorService);
  protected readonly i18n = inject(I18nService);

  protected readonly notch = viewChild.required<ElementRef<HTMLDivElement>>('notch');

  protected readonly darkMode = this.#theme.isDark;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return;
    }

    const destroyRef = inject(DestroyRef);
    const reportNotchRect = () =>
      this.#cursor.setNotchRect(this.notch().nativeElement.getBoundingClientRect());
    afterNextRender(() => {
      reportNotchRect();
      window.addEventListener('resize', reportNotchRect);
      destroyRef.onDestroy(() => {
        window.removeEventListener('resize', reportNotchRect);
        this.#cursor.setNotchRect(null);
      });
    });
  }

  protected readonly activeAppName = computed(() =>
    this.i18n.t(this.#windowManager.frontmost()?.titleKey ?? 'siteOwner'),
  );

  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(this.i18n.locale(), {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(this.#clock.now()),
  );

  toggleTheme(): void {
    this.#theme.toggle();
  }

  toggleLang(): void {
    this.i18n.toggle();
  }

  openAbout(): void {
    this.#windowManager.open('about', 'aboutPortfolio', {
      width: 380,
      height: 540,
      centered: true,
    });
  }
}
