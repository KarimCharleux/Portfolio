import { Video } from './content.model';
import { Lang } from '../core/i18n/translations';

const ACCENTS = ['#FF453A', '#FF9F0A'];

function buildVideos(lang: Lang): Video[] {
  const title = lang === 'fr' ? 'Vidéo temporaire' : 'Placeholder video';
  const caption =
    lang === 'fr'
      ? 'À remplacer par un vrai projet vidéo.'
      : 'Swap with a real video project.';
  return ACCENTS.map((accentColor, i) => ({
    id: `video-${i + 1}`,
    title: `${title} ${i + 1}`,
    caption,
    accentColor,
  }));
}

export const VIDEOS: Record<Lang, Video[]> = {
  en: buildVideos('en'),
  fr: buildVideos('fr'),
};

export const VIDEOS_COUNT = VIDEOS.en.length;
