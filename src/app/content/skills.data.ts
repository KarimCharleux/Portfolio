import { SkillGroup } from './content.model';
import { Lang, TRANSLATIONS, TranslationKey } from '../core/i18n/translations';

/**
 * Only technologies this repository actually builds on, so `skills` is true the
 * day it ships rather than a placeholder wearing a real label. Group *names* are
 * translated; the tech names are proper nouns and stay as they are.
 */
const SKILL_GROUPS: ReadonlyArray<{
  id: string;
  labelKey: TranslationKey;
  items: readonly string[];
}> = [
  {
    id: 'skills-frontend',
    labelKey: 'skillsFrontend',
    items: ['Angular', 'RxJS-free signals', 'SSR / prerendering', 'SCSS'],
  },
  { id: 'skills-languages', labelKey: 'skillsLanguages', items: ['TypeScript', 'HTML', 'CSS'] },
  {
    id: 'skills-tooling',
    labelKey: 'skillsTooling',
    items: ['Vite', 'Vitest', 'Git', 'Firebase'],
  },
  { id: 'skills-design', labelKey: 'skillsDesign', items: ['Figma', 'UI systems', 'Motion'] },
];

function buildSkills(lang: Lang): SkillGroup[] {
  return SKILL_GROUPS.map(({ id, labelKey, items }) => ({
    id,
    label: TRANSLATIONS[labelKey][lang],
    items,
  }));
}

export const SKILLS: Record<Lang, SkillGroup[]> = {
  en: buildSkills('en'),
  fr: buildSkills('fr'),
};

/** Longest group label, so `skills` can pad its first column without measuring at render. */
export const SKILLS_LABEL_WIDTH = Math.max(
  ...Object.values(SKILLS).flatMap((groups) => groups.map((g) => g.label.length)),
);
