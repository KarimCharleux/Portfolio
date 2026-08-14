import { Lang, TranslationKey } from '../core/i18n/translations';

/**
 * Semantic colour roles, not literal colours — the component maps each to a
 * `--terminal-*` token. Named after what the text *is* so a palette change is
 * one edit in `design-tokens.scss`, never a sweep through the command registry.
 */
export type TerminalTone = 'default' | 'dim' | 'accent' | 'success' | 'error' | 'heading';

export interface TerminalSegment {
  text: string;
  tone: TerminalTone;
}

/**
 * One row of command output. Rows carry no id: ids are render bookkeeping, and
 * minting them inside a command would make it stateful and stop `help` from
 * being derivable from the registry.
 */
export type TerminalRow = readonly TerminalSegment[];

/** A row after the component has stamped it for `@for` tracking. */
export interface TerminalLine {
  id: string;
  segments: TerminalRow;
}

export interface CommandContext {
  lang: Lang;
  /** Submitted commands, oldest first — what `history` prints. */
  history: readonly string[];
  /** Passed in, never `new Date()` inside a command, so commands stay pure. */
  now: Date;
  /** BCP 47 tag for `Intl`, from `I18nService.locale`. */
  locale: string;
}

export interface TerminalCommand {
  /** Typed name. Stays English in both locales — a command, not prose. */
  name: string;
  /** Translated one-line summary; `help` renders this as its second column. */
  descriptionKey: TranslationKey;
  /** Argument hint appended after the name in `help`, e.g. `echo <text>`. */
  usage?: string;
  /** `null` means "wipe the scrollback" — how `clear` speaks without a special case. */
  run(args: readonly string[], ctx: CommandContext): TerminalRow[] | null;
}
