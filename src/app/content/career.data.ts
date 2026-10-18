import { CareerKind, CareerStep } from './content.model';
import { Lang, TRANSLATIONS, TranslationKey } from '../core/i18n/translations';

const CAREER_STEPS: ReadonlyArray<{
  id: string;
  kind: CareerKind;
  start: string;
  end: string | null;
  titleKey: TranslationKey;
  orgKey: TranslationKey;
  noteKey?: TranslationKey;
}> = [
  {
    id: 'air-france-engineer',
    kind: 'work',
    start: '2025-09',
    end: null,
    titleKey: 'careerAfCdiTitle',
    orgKey: 'careerAfCdiOrg',
    noteKey: 'careerAfCdiNote',
  },
  {
    id: 'soluxia',
    kind: 'work',
    start: '2025-01',
    end: null,
    titleKey: 'careerSoluxiaTitle',
    orgKey: 'careerSoluxiaOrg',
    noteKey: 'careerSoluxiaNote',
  },
  {
    id: 'air-france-apprentice',
    kind: 'work',
    start: '2022-09',
    end: '2025-08',
    titleKey: 'careerAfApprenticeTitle',
    orgKey: 'careerAfApprenticeOrg',
    noteKey: 'careerAfApprenticeNote',
  },
  {
    id: 'vietnam-internship',
    kind: 'work',
    start: '2024-05',
    end: '2024-07',
    titleKey: 'careerVietnamTitle',
    orgKey: 'careerVietnamOrg',
    noteKey: 'careerVietnamNote',
  },
  {
    id: 'dut-internship',
    kind: 'work',
    start: '2022-03',
    end: '2022-06',
    titleKey: 'careerDutInternTitle',
    orgKey: 'careerDutInternOrg',
  },
  {
    id: 'iae-nice',
    kind: 'school',
    start: '2024-09',
    end: '2025-09',
    titleKey: 'careerIaeTitle',
    orgKey: 'careerIaeOrg',
    noteKey: 'careerIaeNote',
  },
  {
    id: 'polytech',
    kind: 'school',
    start: '2022-09',
    end: '2025-09',
    titleKey: 'careerPolytechTitle',
    orgKey: 'careerPolytechOrg',
    noteKey: 'careerPolytechNote',
  },
  {
    id: 'dut',
    kind: 'school',
    start: '2020-09',
    end: '2022-06',
    titleKey: 'careerDutTitle',
    orgKey: 'careerDutOrg',
  },
];

function buildCareer(lang: Lang): CareerStep[] {
  return CAREER_STEPS.map(({ titleKey, orgKey, noteKey, ...step }) => ({
    ...step,
    title: TRANSLATIONS[titleKey][lang],
    org: TRANSLATIONS[orgKey][lang],
    ...(noteKey ? { note: TRANSLATIONS[noteKey][lang] } : {}),
  }));
}

export const CAREER: Record<Lang, CareerStep[]> = {
  en: buildCareer('en'),
  fr: buildCareer('fr'),
};
