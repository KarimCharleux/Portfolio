import { AppId } from '../window-manager/window.model';

export interface RouteSeoEntry {
  readonly title: string;
  readonly description: string;
}

/**
 * French only — SSR has no way to know a visitor's language preference (same
 * limitation already documented for index.html's baked-in meta), so prerendered
 * meta stays French, matching the `lang="fr"` on the document.
 */
export const ROUTE_SEO: Partial<Record<AppId, RouteSeoEntry>> = {
  about: {
    // Copied verbatim from index.html's existing <title>/description — not new
    // copy, so its em-dash is left as-is rather than rewritten.
    title: 'Karim Charleux — Développeur Full-Stack (Angular · TypeScript)',
    description:
      'Portfolio de Karim Charleux, développeur full-stack basé à Antibes, spécialisé Angular, TypeScript et design, présenté comme un bureau macOS interactif.',
  },
  notes: {
    title: 'Karim Charleux · À propos',
    description:
      "Qui est Karim Charleux, ce qu'il fait et sur quoi il travaille en ce moment, présenté dans l'app Notes de son bureau interactif.",
  },
  vscode: {
    title: 'Karim Charleux · Projets de code',
    description:
      'Les projets de développement de Karim Charleux, développeur full-stack Angular et TypeScript, présentés dans une fenêtre VS Code.',
  },
  finder: {
    title: 'Karim Charleux · Tous les projets',
    description:
      "Vue d'ensemble de tous les projets de Karim Charleux, développeur full-stack basé à Antibes, dans une fenêtre Finder.",
  },
  figma: {
    title: 'Karim Charleux · Travaux de design',
    description:
      'Aperçu des travaux de design de Karim Charleux, présenté dans une fenêtre Figma de son bureau interactif.',
  },
  photoshop: {
    title: 'Karim Charleux · Photos',
    description:
      'Photos de Karim Charleux, présentées dans une fenêtre Photoshop de son bureau interactif.',
  },
  youtube: {
    title: 'Karim Charleux · Vidéos',
    description:
      'Projets vidéo de Karim Charleux, présentés dans une fenêtre YouTube de son bureau interactif.',
  },
  safari: {
    title: 'Karim Charleux · Liens',
    description:
      'Les réseaux et liens de Karim Charleux (LinkedIn, GitHub, Instagram, YouTube), présentés dans une fenêtre Safari de son bureau interactif.',
  },
  sport: {
    title: 'Karim Charleux · Sport',
    description:
      'Cinq ans de course, vélo, natation, randonnée et marche de Karim Charleux en statistiques et graphiques faits main, synchronisés depuis Strava.',
  },
  terminal: {
    title: 'Karim Charleux · Terminal',
    description:
      'Le bureau interactif de Karim Charleux exploré depuis une fenêtre Terminal, avec ses propres commandes.',
  },
};
