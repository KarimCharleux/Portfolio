import { CodeProject } from './content.model';
import { Lang, TRANSLATIONS } from '../core/i18n/translations';

const PROJECT_IDS = ['project-one', 'project-two', 'project-three'];

function buildProjects(lang: Lang): CodeProject[] {
  return PROJECT_IDS.map((id, i) => ({
    id,
    title: `${TRANSLATIONS.placeholderProject[lang]} ${i + 1}`,
    subtitle: TRANSLATIONS.placeholderProjectDesc[lang],
  }));
}

export const CODE_PROJECTS: Record<Lang, CodeProject[]> = {
  en: buildProjects('en'),
  fr: buildProjects('fr'),
};

export const CODE_PROJECTS_COUNT = PROJECT_IDS.length;
