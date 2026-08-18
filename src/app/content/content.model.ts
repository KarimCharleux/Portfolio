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

/** One "About Me" section — title plus bullet lines, each line may carry `**bold**` spans. */
export interface NoteSection {
  id: string;
  title: string;
  lines: readonly string[];
}

export type CodeProject = ListItem;
export type SocialLink = ListItem;
export type Photo = GridItem;
export type DesignWork = GridItem;
export type Video = GridItem;
