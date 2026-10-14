import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClockService } from '../../core/clock/clock.service';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { ThemeService } from '../../core/theme/theme.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { CursorService } from '../../core/cursor/cursor.service';

/** Phosphor icons (regular weight) + Tabler's filled Apple logo, copied from `node_modules/@phosphor-icons/core` and `node_modules/@tabler/icons` at build time (see `angular.json` assets). */
const GLYPHS = {
  apple: 'topbar/brand-apple.svg',
  light: 'topbar/sun.svg',
  dark: 'topbar/moon.svg',
  sound: 'topbar/speaker-high.svg',
  soundOff: 'topbar/speaker-slash.svg',
  bluetooth: 'topbar/bluetooth.svg',
  bluetoothOff: 'topbar/bluetooth-slash.svg',
  battery: 'topbar/battery-high.svg',
  wifi: 'topbar/wifi-high.svg',
  wifiOff: 'topbar/wifi-slash.svg',
} as const;

const glyph = (path: string): string => `url('/${path}')`;

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

  protected readonly soundOn = signal(true);
  protected readonly bluetoothOn = signal(true);
  protected readonly wifiOn = signal(true);

  protected readonly appleGlyph = glyph(GLYPHS.apple);
  protected readonly themeGlyph = computed(() =>
    glyph(this.darkMode() ? GLYPHS.dark : GLYPHS.light),
  );
  protected readonly batteryGlyph = glyph(GLYPHS.battery);
  protected readonly soundGlyph = computed(() =>
    glyph(this.soundOn() ? GLYPHS.sound : GLYPHS.soundOff),
  );
  protected readonly bluetoothGlyph = computed(() =>
    glyph(this.bluetoothOn() ? GLYPHS.bluetooth : GLYPHS.bluetoothOff),
  );
  protected readonly wifiGlyph = computed(() =>
    glyph(this.wifiOn() ? GLYPHS.wifi : GLYPHS.wifiOff),
  );

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return;
    }

    const destroyRef = inject(DestroyRef);
    const reportNotchRect = () =>
      this.#cursor.setNotchRect(this.notch().nativeElement.getBoundingClientRect());
    afterNextRender(() => {
      // Warm the cache so the first toggle doesn't flash an empty mask while the other SVG loads.
      for (const path of [
        GLYPHS.light,
        GLYPHS.dark,
        GLYPHS.soundOff,
        GLYPHS.bluetoothOff,
        GLYPHS.wifiOff,
      ]) {
        new Image().src = `/${path}`;
      }
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

  // macOS separates the date and time with plain spaces ("mer. 14 oct. 11:43",
  // "Wed Oct 14 11:43 AM"), where Intl inserts commas: drop them from the literals.
  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(this.i18n.locale(), {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(this.#clock.now())
      .map((part) => (part.type === 'literal' ? part.value.replace(',', '') : part.value))
      .join(''),
  );

  toggleSound(): void {
    this.soundOn.update((on) => !on);
  }

  toggleBluetooth(): void {
    this.bluetoothOn.update((on) => !on);
  }

  toggleWifi(): void {
    this.wifiOn.update((on) => !on);
  }

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
