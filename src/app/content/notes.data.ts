import { NoteEntry } from './content.model';
import { Lang, TRANSLATIONS, TranslationKey } from '../core/i18n/translations';

const NOTE_KEYS: readonly { id: string; titleKey: TranslationKey; subtitleKey: TranslationKey }[] =
  [
    { id: 'note-who-i-am', titleKey: 'notesWhoTitle', subtitleKey: 'notesWhoSubtitle' },
    { id: 'note-what-i-do', titleKey: 'notesWhatTitle', subtitleKey: 'notesWhatSubtitle' },
    { id: 'note-now', titleKey: 'notesNowTitle', subtitleKey: 'notesNowSubtitle' },
  ];

function buildNotes(lang: Lang): NoteEntry[] {
  return NOTE_KEYS.map(({ id, titleKey, subtitleKey }) => ({
    id,
    title: TRANSLATIONS[titleKey][lang],
    subtitle: TRANSLATIONS[subtitleKey][lang],
  }));
}

export const NOTES: Record<Lang, NoteEntry[]> = {
  en: buildNotes('en'),
  fr: buildNotes('fr'),
};

export const NOTES_COUNT = NOTE_KEYS.length;
