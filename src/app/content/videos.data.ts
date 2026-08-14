import { Video } from './content.model';
import { Lang, TRANSLATIONS } from '../core/i18n/translations';

const ACCENTS = ['#FF453A', '#FF9F0A'];

function buildVideos(lang: Lang): Video[] {
  return ACCENTS.map((accentColor, i) => ({
    id: `video-${i + 1}`,
    title: `${TRANSLATIONS.placeholderVideo[lang]} ${i + 1}`,
    caption: TRANSLATIONS.videoCaption[lang],
    accentColor,
  }));
}

export const VIDEOS: Record<Lang, Video[]> = {
  en: buildVideos('en'),
  fr: buildVideos('fr'),
};

export const VIDEOS_COUNT = ACCENTS.length;
