import { CodeProject } from './content.model';
import { Lang } from '../core/i18n/translations';

function buildProjects(lang: Lang): CodeProject[] {
  const title = lang === 'fr' ? 'Projet temporaire' : 'Placeholder project';
  const subtitle =
    lang === 'fr'
      ? 'Description temporaire — à remplacer par un vrai résumé de dépôt.'
      : 'Placeholder description — swap with a real repo summary.';
  return [
    { id: 'project-one', title: `${title} 1`, subtitle },
    { id: 'project-two', title: `${title} 2`, subtitle },
    { id: 'project-three', title: `${title} 3`, subtitle },
  ];
}

export const CODE_PROJECTS: Record<Lang, CodeProject[]> = {
  en: buildProjects('en'),
  fr: buildProjects('fr'),
};

export const CODE_PROJECTS_COUNT = CODE_PROJECTS.en.length;
