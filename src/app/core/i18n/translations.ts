export type Lang = 'en' | 'fr';

export const TRANSLATIONS = {
  aboutMe: { en: 'About Me', fr: 'À propos de moi' },
  codeProjects: { en: 'Code Projects', fr: 'Projets de code' },
  photos: { en: 'Photos', fr: 'Photos' },
  designWork: { en: 'Design Work', fr: 'Travaux de design' },
  videoProjects: { en: 'Video Projects', fr: 'Projets vidéo' },
  getInTouch: { en: 'Get in Touch', fr: 'Me contacter' },
  links: { en: 'Links', fr: 'Liens' },
  allProjects: { en: 'All Projects', fr: 'Tous les projets' },

  mailName: { en: 'Name', fr: 'Nom' },
  mailEmail: { en: 'Email', fr: 'E-mail' },
  mailMessage: { en: 'Message', fr: 'Message' },
  mailSend: { en: 'Send', fr: 'Envoyer' },
  mailConfirmation: {
    en: 'Thanks — your email client should open shortly.',
    fr: "Merci — votre client mail devrait s'ouvrir sous peu.",
  },

  placeholderProject: { en: 'Placeholder project', fr: 'Projet temporaire' },
  placeholderProjectDesc: {
    en: 'Placeholder description — swap with a real repo summary.',
    fr: 'Description temporaire — à remplacer par un vrai résumé de dépôt.',
  },
  placeholderPhoto: { en: 'Placeholder photo', fr: 'Photo temporaire' },
  photoCaption: { en: 'Swap with a real photo.', fr: 'À remplacer par une vraie photo.' },
  placeholderDesign: { en: 'Placeholder design', fr: 'Design temporaire' },
  designCaption: {
    en: 'Swap with real design work.',
    fr: 'À remplacer par un vrai travail de design.',
  },
  placeholderVideo: { en: 'Placeholder video', fr: 'Vidéo temporaire' },
  videoCaption: {
    en: 'Swap with a real video project.',
    fr: 'À remplacer par un vrai projet vidéo.',
  },
  socialLinkPlaceholder: {
    en: 'Placeholder — swap with the real profile URL.',
    fr: "Temporaire — à remplacer par la vraie URL du profil.",
  },

  notesWhoTitle: { en: 'Who I am', fr: 'Qui je suis' },
  notesWhoSubtitle: {
    en: 'Placeholder bio line — swap with a real introduction.',
    fr: 'Ligne de bio temporaire — à remplacer par une vraie présentation.',
  },
  notesWhatTitle: { en: 'What I do', fr: 'Ce que je fais' },
  notesWhatSubtitle: {
    en: 'Placeholder — swap with real areas of focus.',
    fr: 'Temporaire — à remplacer par mes domaines réels.',
  },
  notesNowTitle: { en: 'Right now', fr: 'En ce moment' },
  notesNowSubtitle: {
    en: 'Placeholder — swap with current focus/availability.',
    fr: 'Temporaire — à remplacer par mon focus/disponibilité actuels.',
  },

  langToggleLabel: { en: 'Switch language', fr: 'Changer de langue' },
} as const satisfies Record<string, Record<Lang, string>>;

export type TranslationKey = keyof typeof TRANSLATIONS;
