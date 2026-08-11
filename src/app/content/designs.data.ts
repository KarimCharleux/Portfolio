import { DesignWork } from './content.model';
import { Lang } from '../core/i18n/translations';

const ACCENTS = ['#FF375F', '#0A84FF', '#BF5AF2'];

function buildDesigns(lang: Lang): DesignWork[] {
  const title = lang === 'fr' ? 'Design temporaire' : 'Placeholder design';
  const caption =
    lang === 'fr'
      ? 'À remplacer par un vrai travail de design.'
      : 'Swap with real design work.';
  return ACCENTS.map((accentColor, i) => ({
    id: `design-${i + 1}`,
    title: `${title} ${i + 1}`,
    caption,
    accentColor,
  }));
}

export const DESIGNS: Record<Lang, DesignWork[]> = {
  en: buildDesigns('en'),
  fr: buildDesigns('fr'),
};

export const DESIGNS_COUNT = DESIGNS.en.length;
