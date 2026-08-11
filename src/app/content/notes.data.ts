import { NoteEntry } from './content.model';
import { Lang } from '../core/i18n/translations';

export const NOTES: Record<Lang, NoteEntry[]> = {
  en: [
    {
      id: 'note-who-i-am',
      title: 'Who I am',
      subtitle: 'Placeholder bio line — swap with a real introduction.',
    },
    {
      id: 'note-what-i-do',
      title: 'What I do',
      subtitle: 'Placeholder — swap with real areas of focus.',
    },
    {
      id: 'note-now',
      title: 'Right now',
      subtitle: 'Placeholder — swap with current focus/availability.',
    },
  ],
  fr: [
    {
      id: 'note-who-i-am',
      title: 'Qui je suis',
      subtitle: 'Ligne de bio temporaire — à remplacer par une vraie présentation.',
    },
    {
      id: 'note-what-i-do',
      title: 'Ce que je fais',
      subtitle: 'Temporaire — à remplacer par mes domaines réels.',
    },
    {
      id: 'note-now',
      title: 'En ce moment',
      subtitle: 'Temporaire — à remplacer par mon focus/disponibilité actuels.',
    },
  ],
};

export const NOTES_COUNT = NOTES.en.length;
