export type Lang = 'en' | 'fr';

export const LANGS = ['en', 'fr'] as const satisfies readonly Lang[];

/** BCP 47 tags for `Intl` formatters — never hand-map a `Lang` to a locale in a component. */
export const LOCALES = { en: 'en-US', fr: 'fr-FR' } as const satisfies Record<Lang, string>;

export const TRANSLATIONS = {
  aboutMe: { en: 'About Me', fr: 'À propos de moi' },
  codeProjects: { en: 'Code Projects', fr: 'Projets de code' },
  photos: { en: 'Photos', fr: 'Photos' },
  designWork: { en: 'Design Work', fr: 'Travaux de design' },
  videoProjects: { en: 'Video Projects', fr: 'Projets vidéo' },
  links: { en: 'Links', fr: 'Liens' },
  allProjects: { en: 'All Projects', fr: 'Tous les projets' },
  messages: { en: 'Messages', fr: 'Messages' },
  terminal: { en: 'Terminal', fr: 'Terminal' },
  trash: { en: 'Trash', fr: 'Corbeille' },
  sportStats: { en: 'Sport stats', fr: 'Stats sportives' },
  soluxiaWeb: { en: 'My web agency', fr: 'Mon agence web' },

  // App names as shown in the dock, the mobile home screen, Finder rows and window titles.
  // Brand names stay identical across locales but still go through the table so every
  // user-visible label has exactly one lookup path.
  dockNotes: { en: 'Notes', fr: 'Notes' },
  dockVscode: { en: 'VS Code', fr: 'VS Code' },
  dockPhotos: { en: 'Photos', fr: 'Photos' },
  dockFigma: { en: 'Figma', fr: 'Figma' },
  dockYoutube: { en: 'YouTube', fr: 'YouTube' },
  dockSport: { en: 'Sport', fr: 'Sport' },
  dockSafari: { en: 'Safari', fr: 'Safari' },
  dockFinder: { en: 'Finder', fr: 'Finder' },
  dockMessages: { en: 'Messages', fr: 'Messages' },
  dockTerminal: { en: 'Terminal', fr: 'Terminal' },
  dockTrash: { en: 'Trash', fr: 'Corbeille' },
  dockSoluxia: { en: 'Soluxia Web', fr: 'Soluxia Web' },

  siteOwner: { en: 'Karim Charleux', fr: 'Karim Charleux' },

  placeholderProject: { en: 'Placeholder project', fr: 'Projet temporaire' },
  placeholderProjectDesc: {
    en: 'Placeholder description — swap with a real repo summary.',
    fr: 'Description temporaire — à remplacer par un vrai résumé de dépôt.',
  },
  photoAlt: { en: 'Photo', fr: 'Photo' },
  photosClose: { en: 'Close photo', fr: 'Fermer la photo' },
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
  notesWhoTitle: { en: 'Who I am', fr: 'Qui je suis' },
  notesWhoLine1: {
    en: '**Full-Stack Developer** based in Antibes, mostly front-end but I touch everything.',
    fr: '**Développeur Full-Stack** basé à Antibes, plutôt front mais je touche à tout.',
  },
  notesWhoLine2: {
    en: "**Polytech Nice** engineering grad (Human-Machine Interface track) plus a Master's from IAE Nice. One degree is good, two is better.",
    fr: "Diplômé **Polytech Nice** (spécialité Interface Homme-Machine) + un Master MAE à l'IAE Nice. Un diplôme c'est bien, deux c'est mieux.",
  },
  notesWhatTitle: { en: 'What I do', fr: 'Ce que je fais' },
  notesWhatLine1: {
    en: '**Software Engineer, full-time at Air France**. Angular, GraphQL, Java/Spring Boot.',
    fr: '**Ingénieur logiciel en CDI chez Air France**. Angular, GraphQL, Java/Spring Boot.',
  },
  notesWhatLine2: {
    en: '**Cofounder of Soluxia Web** with Damien. We help small and medium businesses go digital, AI included when it helps.',
    fr: '**Cofondateur de Soluxia Web** avec Damien. On aide les PME à digitaliser leurs process, IA incluse si besoin.',
  },
  notesWhatLine3: {
    en: '3 internal hackathons, 3 wins: Meetsite (a building wayfinding app, still used today), a Pokemon-style game built on the org chart, and Iris, a local AI assistant for developers.',
    fr: "3 hackathons internes, 3 prix : Meetsite (appli d'orientation bâtiment, encore utilisée aujourd'hui), un jeu façon Pokémon avec l'organigramme, et Iris, un assistant IA local pour devs.",
  },
  notesNowTitle: { en: 'Right now', fr: 'En ce moment' },
  notesNowLine1: {
    en: 'Training for an **Olympic-distance triathlon** (format L).',
    fr: 'Entraînement **triathlon format L**.',
  },
  notesNowLine2: {
    en: 'Building Soluxia Web in my spare time.',
    fr: 'Soluxia Web sur le temps libre.',
  },
  notesNowLine3: {
    en: 'Running a drone FPV YouTube channel for 8 years now (WodeFPV). Coding all day makes you want to fly a little.',
    fr: 'Chaîne YouTube drone FPV ouverte depuis 8 ans (WodeFPV). Coder toute la journée, ça donne envie de voler un peu.',
  },

  langToggleLabel: { en: 'Switch language', fr: 'Changer de langue' },
  toggleDarkMode: { en: 'Toggle dark mode', fr: 'Changer de thème' },
  windowClose: { en: 'Close', fr: 'Fermer' },
  windowMinimize: { en: 'Minimize', fr: 'Réduire' },
  windowZoom: { en: 'Zoom', fr: 'Zoomer' },
  back: { en: 'Back', fr: 'Retour' },

  // Boot lock screen prompt: the click/tap/Enter that starts the arrival animation
  // (and unlocks Web Audio for its chime, which browsers only allow after a gesture).
  bootUnlockClick: { en: 'Click to enter', fr: 'Cliquez pour entrer' },
  bootUnlockTap: { en: 'Tap to enter', fr: 'Touchez pour entrer' },

  aboutPortfolio: { en: 'About This Portfolio', fr: 'À propos de ce portfolio' },
  aboutPortfolioOS: { en: 'Portfolio OS 1.0', fr: 'Portfolio OS 1.0' },
  aboutPortfolioRole: { en: 'Role', fr: 'Rôle' },
  aboutPortfolioRoleValue: {
    en: 'Full-Stack Developer',
    fr: 'Développeur Full-Stack',
  },
  aboutPortfolioFocus: { en: 'Focus', fr: 'Spécialité' },
  aboutPortfolioFocusValue: {
    en: 'Angular · TypeScript · Design',
    fr: 'Angular · TypeScript · Design',
  },
  aboutPortfolioLocation: { en: 'Based in', fr: 'Basé à' },
  aboutPortfolioLocationValue: {
    en: 'Antibes, France',
    fr: 'Antibes, France',
  },
  aboutPortfolioContact: { en: 'Contact', fr: 'Contact' },
  aboutPortfolioContactValue: {
    en: 'karim.charleux@hotmail.fr',
    fr: 'karim.charleux@hotmail.fr',
  },
  aboutPortfolioMoreInfo: { en: 'More Info…', fr: "Plus d'infos…" },
  allRightsReserved: { en: 'All Rights Reserved.', fr: 'Tous droits réservés.' },

  // Terminal chrome. Command *names*, the prompt, `whoami`/`pwd` output and the
  // zsh not-found error stay untranslated on purpose — they are system strings,
  // and localising them would break the illusion of a real shell.
  terminalInputLabel: { en: 'Terminal input', fr: 'Saisie du terminal' },
  terminalHelpHeading: { en: 'COMMANDS', fr: 'COMMANDES' },
  terminalNoHistory: { en: 'No commands yet.', fr: 'Aucune commande pour le moment.' },
  terminalSudoJoke: {
    en: 'Nice try. This incident will be reported.',
    fr: 'Bien tenté. Cet incident sera signalé.',
  },
  // Split so `help` can be tinted mid-sentence without markup in a translation.
  terminalHintBefore: { en: 'Type ', fr: 'Tapez ' },
  terminalHintAfter: {
    en: ' to discover the available commands.',
    fr: ' pour découvrir les commandes disponibles.',
  },

  cmdHelpDesc: { en: 'List the available commands', fr: 'Lister les commandes disponibles' },
  cmdAboutDesc: { en: 'Who I am', fr: 'Qui je suis' },
  cmdProjectsDesc: { en: 'Code projects', fr: 'Projets de code' },
  cmdSkillsDesc: { en: 'Tech stack', fr: 'Stack technique' },
  cmdContactDesc: { en: 'How to reach me', fr: 'Me joindre' },
  cmdLsDesc: { en: 'List the portfolio sections', fr: 'Lister les sections du portfolio' },
  cmdNeofetchDesc: { en: 'System information', fr: 'Informations système' },
  cmdWhoamiDesc: { en: 'Print the current user', fr: "Afficher l'utilisateur courant" },
  cmdPwdDesc: { en: 'Print the working directory', fr: 'Afficher le répertoire courant' },
  cmdDateDesc: { en: 'Current date and time', fr: 'Date et heure actuelles' },
  cmdEchoDesc: { en: 'Print the given text', fr: 'Afficher le texte donné' },
  cmdHistoryDesc: { en: 'Show the command history', fr: "Afficher l'historique des commandes" },
  cmdClearDesc: { en: 'Clear the screen', fr: "Effacer l'écran" },
  cmdSudoDesc: { en: 'Run as superuser', fr: 'Exécuter en superutilisateur' },

  skillsFrontend: { en: 'Frontend', fr: 'Frontend' },
  skillsLanguages: { en: 'Languages', fr: 'Langages' },
  skillsTooling: { en: 'Tooling', fr: 'Outils' },
  skillsDesign: { en: 'Design', fr: 'Design' },

  // Sport app
  sportAll: { en: 'All', fr: 'Tous' },
  sportRun: { en: 'Running', fr: 'Course' },
  sportRide: { en: 'Cycling', fr: 'Vélo' },
  sportSwim: { en: 'Swimming', fr: 'Natation' },
  sportHike: { en: 'Hiking', fr: 'Randonnée' },
  sportWalk: { en: 'Walking', fr: 'Marche' },
  sportFilterLabel: { en: 'Filter by sport', fr: 'Filtrer par sport' },
  sportSectionsLabel: { en: 'Sections', fr: 'Sections' },
  sportOverview: { en: 'Overview', fr: "Vue d'ensemble" },
  sportCalendar: { en: 'Calendar', fr: 'Calendrier' },
  sportVolume: { en: 'Weekly volume', fr: 'Volume hebdo' },
  sportYears: { en: 'Year by year', fr: 'Année par année' },
  sportRoutes: { en: 'Routes', fr: 'Tracés' },
  sportBreakdown: { en: 'Sports', fr: 'Sports' },
  sportUpdated: { en: 'Updated', fr: 'Mis à jour le' },
  sportSince: { en: 'Since', fr: 'Depuis le' },
  sportPoweredBy: { en: 'Powered by Strava', fr: 'Powered by Strava' },
  sportEmpty: { en: 'No activity', fr: 'Pas d’activité' },
  sportKm: { en: 'km', fr: 'km' },
  sportHours: { en: 'hours', fr: 'heures' },
  sportHoursShort: { en: 'h', fr: 'h' },
  sportMetricLabel: { en: 'Measure', fr: 'Mesure' },
  sportByHours: { en: 'Time', fr: 'Temps' },
  sportByKm: { en: 'Distance', fr: 'Distance' },
  sportWeekNumber: { en: 'Week', fr: 'Semaine' },
  sportWeekOf: { en: 'Week of', fr: 'Semaine du' },
  sportHoursPerWeek: { en: 'hours / week', fr: 'heures / semaine' },
  sportElevation: { en: 'elevation gain', fr: 'de dénivelé' },
  sportActivities: { en: 'activities', fr: 'sorties' },
  sportDistance: { en: 'Distance', fr: 'Distance' },
  sportDuration: { en: 'Moving time', fr: 'Temps en mouvement' },
  sportClimb: { en: 'Elevation', fr: 'Dénivelé' },
  sportCount: { en: 'Activities', fr: 'Sorties' },
  sportEquivTitle: { en: 'In other words', fr: 'Autrement dit' },
  equivParisMarseille: { en: 'Paris → Marseille trips', fr: 'trajets Paris → Marseille' },
  equivEarth: { en: 'laps around the Earth', fr: 'tours de la Terre' },
  equivEverest: { en: 'Everest climbs from sea level', fr: "ascensions de l'Everest" },
  equivMontBlanc: { en: 'Mont Blanc climbs from sea level', fr: 'ascensions du Mont-Blanc' },
  equivMarathons: { en: 'marathons', fr: 'marathons' },
  equivChannel: { en: 'English Channel crossings', fr: 'traversées de la Manche' },
  sportYearLabel: { en: 'Year', fr: 'Année' },
  sportLess: { en: 'Less', fr: 'Moins' },
  sportMore: { en: 'More', fr: 'Plus' },
  sportMinutesShort: { en: 'min', fr: 'min' },
  sportBackToSections: { en: 'Sections', fr: 'Sections' },
} as const satisfies Record<string, Record<Lang, string>>;

export type TranslationKey = keyof typeof TRANSLATIONS;
