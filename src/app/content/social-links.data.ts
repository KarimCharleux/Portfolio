import { SocialLink } from './content.model';
import { Lang } from '../core/i18n/translations';

function buildLinks(): SocialLink[] {
  return [
    {
      id: 'link-linkedin',
      title: 'LinkedIn',
      subtitle: 'in/karim-charleux',
      url: 'https://www.linkedin.com/in/karim-charleux/',
    },
    {
      id: 'link-github',
      title: 'GitHub',
      subtitle: '@KarimCharleux',
      url: 'https://github.com/KarimCharleux',
    },
    {
      id: 'link-instagram',
      title: 'Instagram',
      subtitle: '@karim.chrx',
      url: 'https://www.instagram.com/karim.chrx/',
    },
    {
      id: 'link-youtube',
      title: 'YouTube',
      subtitle: '@WodeFPV',
      url: 'https://www.youtube.com/@WodeFPV',
    },
  ];
}

export const SOCIAL_LINKS: Record<Lang, SocialLink[]> = {
  en: buildLinks(),
  fr: buildLinks(),
};

export const SOCIAL_LINKS_COUNT = SOCIAL_LINKS.en.length;
