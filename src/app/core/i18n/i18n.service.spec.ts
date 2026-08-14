import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';
import { LANGS, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'portfolio.lang';

function makeService(): I18nService {
  TestBed.resetTestingModule();
  return TestBed.inject(I18nService);
}

describe('I18nService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('defaults to French for a French browser', () => {
    expect(makeService().lang()).toBe('fr');
  });

  it('falls back to English for a non-French browser', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-GB');
    expect(makeService().lang()).toBe('en');
  });

  it('prefers a previously stored choice over the browser language', () => {
    localStorage.setItem(STORAGE_KEY, 'en');
    expect(makeService().lang()).toBe('en');
  });

  it('ignores a corrupted stored value', () => {
    localStorage.setItem(STORAGE_KEY, 'de');
    expect(makeService().lang()).toBe('fr');
  });

  it('toggles between the two languages', () => {
    const service = makeService();
    service.toggle();
    expect(service.lang()).toBe('en');
    service.toggle();
    expect(service.lang()).toBe('fr');
  });

  it('resolves a key in the active language', () => {
    const service = makeService();
    expect(service.t('windowClose')).toBe('Fermer');
    service.setLang('en');
    expect(service.t('windowClose')).toBe('Close');
  });

  it('exposes a BCP 47 locale for Intl formatters', () => {
    const service = makeService();
    expect(service.locale()).toBe('fr-FR');
    service.setLang('en');
    expect(service.locale()).toBe('en-US');
  });

  it('syncs document.documentElement.lang and persists the choice', async () => {
    const service = makeService();
    TestBed.tick();
    expect(document.documentElement.lang).toBe('fr');

    service.setLang('en');
    TestBed.tick();
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('en');
  });

  it('has an entry for every language on every key', () => {
    for (const [key, entry] of Object.entries(TRANSLATIONS)) {
      for (const lang of LANGS) {
        expect(entry[lang], `${key}.${lang}`).toBeTruthy();
      }
    }
  });
});
