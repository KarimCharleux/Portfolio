import { Photo } from './content.model';
import { Lang, TRANSLATIONS } from '../core/i18n/translations';

const ACCENTS = ['#8E8E93', '#A2845E', '#5E5CE6', '#34C759'];

function buildPhotos(lang: Lang): Photo[] {
  return ACCENTS.map((accentColor, i) => ({
    id: `photo-${i + 1}`,
    title: `${TRANSLATIONS.placeholderPhoto[lang]} ${i + 1}`,
    caption: TRANSLATIONS.photoCaption[lang],
    accentColor,
  }));
}

export const PHOTOS: Record<Lang, Photo[]> = {
  en: buildPhotos('en'),
  fr: buildPhotos('fr'),
};

export const PHOTOS_COUNT = ACCENTS.length;
