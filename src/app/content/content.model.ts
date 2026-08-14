export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
}

export interface GridItem {
  id: string;
  title: string;
  caption: string;
  /** CSS color for the placeholder tile background. */
  accentColor: string;
}

/** A labelled cluster of technologies, rendered as one row by the Terminal's `skills`. */
export interface SkillGroup {
  id: string;
  label: string;
  items: readonly string[];
}

export type NoteEntry = ListItem;
export type CodeProject = ListItem;
export type SocialLink = ListItem;
export type Photo = GridItem;
export type DesignWork = GridItem;
export type Video = GridItem;
