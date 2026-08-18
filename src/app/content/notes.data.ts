import { NoteSection } from './content.model';
import { Lang, TRANSLATIONS, TranslationKey } from '../core/i18n/translations';

const NOTE_SECTIONS: ReadonlyArray<{
  id: string;
  titleKey: TranslationKey;
  lineKeys: readonly TranslationKey[];
}> = [
  {
    id: 'note-who-i-am',
    titleKey: 'notesWhoTitle',
    lineKeys: ['notesWhoLine1', 'notesWhoLine2'],
  },
  {
    id: 'note-what-i-do',
    titleKey: 'notesWhatTitle',
    lineKeys: ['notesWhatLine1', 'notesWhatLine2', 'notesWhatLine3'],
  },
  {
    id: 'note-now',
    titleKey: 'notesNowTitle',
    lineKeys: ['notesNowLine1', 'notesNowLine2', 'notesNowLine3'],
  },
];

function buildNotes(lang: Lang): NoteSection[] {
  return NOTE_SECTIONS.map(({ id, titleKey, lineKeys }) => ({
    id,
    title: TRANSLATIONS[titleKey][lang],
    lines: lineKeys.map((key) => TRANSLATIONS[key][lang]),
  }));
}

export const NOTES: Record<Lang, NoteSection[]> = {
  en: buildNotes('en'),
  fr: buildNotes('fr'),
};

export const NOTES_COUNT = NOTE_SECTIONS.length;
