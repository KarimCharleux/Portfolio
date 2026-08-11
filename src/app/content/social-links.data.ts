import { SocialLink } from './content.model';
import { Lang } from '../core/i18n/translations';

function buildLinks(lang: Lang): SocialLink[] {
  const subtitle =
    lang === 'fr'
      ? "Temporaire — à remplacer par la vraie URL du profil."
      : 'Placeholder — swap with the real profile URL.';
  return [
    { id: 'link-github', title: 'GitHub', subtitle, url: 'https://github.com/' },
    { id: 'link-linkedin', title: 'LinkedIn', subtitle, url: 'https://www.linkedin.com/' },
  ];
}

export const SOCIAL_LINKS: Record<Lang, SocialLink[]> = {
  en: buildLinks('en'),
  fr: buildLinks('fr'),
};

export const SOCIAL_LINKS_COUNT = SOCIAL_LINKS.en.length;
