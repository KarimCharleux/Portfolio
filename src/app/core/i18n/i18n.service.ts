import { DOCUMENT, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LANGS, LOCALES, Lang, TRANSLATIONS, TranslationKey } from './translations';

const STORAGE_KEY = 'portfolio.lang';

/** Matches the `lang` baked into `src/index.html`, so the prerendered markup is French. */
const DEFAULT_LANG: Lang = 'fr';

function isLang(value: string | null): value is Lang {
  return value !== null && (LANGS as readonly string[]).includes(value);
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly #document = inject(DOCUMENT);
  readonly #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly #langSignal = signal<Lang>(DEFAULT_LANG);

  readonly lang = this.#langSignal.asReadonly();

  /** BCP 47 tag for `Intl` formatters — components must not map `Lang` to a locale themselves. */
  readonly locale = computed(() => LOCALES[this.#langSignal()]);

  constructor() {
    if (!this.#isBrowser) {
      return;
    }

    // An explicit past choice wins over the browser's preference.
    this.#langSignal.set(this.#storedLang() ?? this.#browserLang());

    effect(() => {
      const lang = this.#langSignal();
      // Keeps `<html lang>` truthful for screen readers and Google after a toggle.
      this.#document.documentElement.lang = lang;
      this.#store(lang);
    });
  }

  setLang(lang: Lang): void {
    this.#langSignal.set(lang);
  }

  toggle(): void {
    this.#langSignal.set(this.#langSignal() === 'en' ? 'fr' : 'en');
  }

  t(key: TranslationKey): string {
    return TRANSLATIONS[key][this.#langSignal()];
  }

  #browserLang(): Lang {
    return this.#document.defaultView?.navigator.language?.toLowerCase().startsWith('fr')
      ? 'fr'
      : 'en';
  }

  #storedLang(): Lang | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return isLang(stored) ? stored : null;
    } catch {
      // Storage can be denied (Safari private browsing, blocked third-party contexts).
      return null;
    }
  }

  #store(lang: Lang): void {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Same as above — persistence is a nicety, never a hard requirement.
    }
  }
}
