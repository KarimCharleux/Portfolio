import { Injectable, signal } from '@angular/core';
import { Lang, TRANSLATIONS, TranslationKey } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly #langSignal = signal<Lang>('fr');
  readonly lang = this.#langSignal.asReadonly();

  setLang(lang: Lang): void {
    this.#langSignal.set(lang);
  }

  toggle(): void {
    this.#langSignal.set(this.#langSignal() === 'en' ? 'fr' : 'en');
  }

  t(key: TranslationKey): string {
    return TRANSLATIONS[key][this.#langSignal()];
  }
}
