import { DesignWork } from './content.model';
import { Lang, TRANSLATIONS } from '../core/i18n/translations';

const ACCENTS = ['#FF375F', '#0A84FF', '#BF5AF2'];

function buildDesigns(lang: Lang): DesignWork[] {
  return ACCENTS.map((accentColor, i) => ({
    id: `design-${i + 1}`,
    title: `${TRANSLATIONS.placeholderDesign[lang]} ${i + 1}`,
    caption: TRANSLATIONS.designCaption[lang],
    accentColor,
  }));
}

export const DESIGNS: Record<Lang, DesignWork[]> = {
  en: buildDesigns('en'),
  fr: buildDesigns('fr'),
};

export const DESIGNS_COUNT = ACCENTS.length;
