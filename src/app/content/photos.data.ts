import { Photo } from './content.model';
import { Lang } from '../core/i18n/translations';

const ACCENTS = ['#8E8E93', '#A2845E', '#5E5CE6', '#34C759'];

function buildPhotos(lang: Lang): Photo[] {
  const title = lang === 'fr' ? 'Photo temporaire' : 'Placeholder photo';
  const caption = lang === 'fr' ? 'À remplacer par une vraie photo.' : 'Swap with a real photo.';
  return ACCENTS.map((accentColor, i) => ({
    id: `photo-${i + 1}`,
    title: `${title} ${i + 1}`,
    caption,
    accentColor,
  }));
}

export const PHOTOS: Record<Lang, Photo[]> = {
  en: buildPhotos('en'),
  fr: buildPhotos('fr'),
};

export const PHOTOS_COUNT = PHOTOS.en.length;
