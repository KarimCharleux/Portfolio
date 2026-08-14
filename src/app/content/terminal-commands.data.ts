import {
  CommandContext,
  TerminalCommand,
  TerminalRow,
  TerminalSegment,
  TerminalTone,
} from './terminal.model';
import { TRANSLATIONS, TranslationKey } from '../core/i18n/translations';
import { NOTES } from './notes.data';
import { CODE_PROJECTS } from './code-projects.data';
import { SOCIAL_LINKS } from './social-links.data';
import { SKILLS, SKILLS_LABEL_WIDTH } from './skills.data';

const seg = (text: string, tone: TerminalTone = 'default'): TerminalSegment => ({ text, tone });

/** A blank scrollback row. */
const BLANK: TerminalRow = [];

/** Indent shared by every list-style command, so all output lines up. */
const INDENT = '  ';

const t = (key: TranslationKey, ctx: CommandContext): string => TRANSLATIONS[key][ctx.lang];

const pad = (text: string, width: number): string => text.padEnd(width, ' ');

/**
 * Two-column body: a coloured left column padded to a shared width, then dim
 * prose. Used by `help`, `skills` and `neofetch` so the three agree visually.
 */
function columns(
  entries: ReadonlyArray<{ left: string; right: string }>,
  leftTone: TerminalTone = 'accent',
): TerminalRow[] {
  const width = Math.max(...entries.map((e) => e.left.length));
  return entries.map(({ left, right }) => [
    seg(INDENT + pad(left, width + 2), leftTone),
    seg(right, 'dim'),
  ]);
}

/**
 * Rendered beside `neofetch`'s info column. Original monogram — not Apple
 * artwork. Built from U+2588 FULL BLOCK and spaces only: box-drawing characters
 * fall back to a different font in this stack and the mismatched advance width
 * shears the letter apart.
 */
const MONOGRAM: readonly string[] = [
  '██   ██',
  '██  ██ ',
  '██ ██  ',
  '█████  ',
  '██ ██  ',
  '██  ██ ',
  '██   ██',
];

const PROMPT_USER = 'karim';
const PROMPT_HOST = 'karimagine';
const HOME_PATH = `/Users/${PROMPT_USER}`;

/** Commands that print portfolio content — the set `ls` lists. */
const CONTENT_COMMANDS = ['about', 'projects', 'skills', 'contact'] as const;

export const COMMANDS: readonly TerminalCommand[] = [
  {
    name: 'help',
    descriptionKey: 'cmdHelpDesc',
    run(_args, ctx) {
      // Built from COMMANDS itself: a new command shows up here for free, and
      // one that forgets its description is impossible to miss.
      const entries = COMMANDS.map((cmd) => ({
        left: cmd.usage ? `${cmd.name} ${cmd.usage}` : cmd.name,
        right: t(cmd.descriptionKey, ctx),
      }));
      return [BLANK, [seg(t('terminalHelpHeading', ctx), 'heading')], ...columns(entries), BLANK];
    },
  },
  {
    name: 'about',
    descriptionKey: 'cmdAboutDesc',
    run(_args, ctx) {
      const rows: TerminalRow[] = [BLANK];
      for (const note of NOTES[ctx.lang]) {
        rows.push(
          [seg(INDENT + note.title, 'heading')],
          [seg(INDENT + note.subtitle, 'dim')],
          BLANK,
        );
      }
      return rows;
    },
  },
  {
    name: 'projects',
    descriptionKey: 'cmdProjectsDesc',
    run(_args, ctx) {
      const rows: TerminalRow[] = [BLANK];
      for (const project of CODE_PROJECTS[ctx.lang]) {
        rows.push(
          [seg(INDENT, 'dim'), seg(project.title, 'accent')],
          [seg(INDENT + '  ' + project.subtitle, 'dim')],
          BLANK,
        );
      }
      return rows;
    },
  },
  {
    name: 'skills',
    descriptionKey: 'cmdSkillsDesc',
    run(_args, ctx) {
      const rows: TerminalRow[] = [BLANK];
      for (const group of SKILLS[ctx.lang]) {
        rows.push([
          seg(INDENT + pad(group.label, SKILLS_LABEL_WIDTH + 2), 'accent'),
          seg(group.items.join('  ·  ')),
        ]);
      }
      rows.push(BLANK);
      return rows;
    },
  },
  {
    name: 'contact',
    descriptionKey: 'cmdContactDesc',
    run(_args, ctx) {
      const entries = [
        { left: 'email', right: TRANSLATIONS.aboutPortfolioContactValue[ctx.lang] },
        ...SOCIAL_LINKS[ctx.lang].map((link) => ({
          left: link.title.toLowerCase(),
          right: link.url ?? link.subtitle,
        })),
      ];
      // URLs print as inert text — a real terminal does not hyperlink, and Safari
      // is one dock click away.
      return [BLANK, ...columns(entries), BLANK];
    },
  },
  {
    name: 'ls',
    descriptionKey: 'cmdLsDesc',
    run() {
      return [[seg(CONTENT_COMMANDS.join('   '), 'accent')]];
    },
  },
  {
    name: 'neofetch',
    descriptionKey: 'cmdNeofetchDesc',
    run(_args, ctx) {
      const info: readonly TerminalRow[] = [
        [seg(`${PROMPT_USER}@${PROMPT_HOST}`, 'heading')],
        [seg('-'.repeat(PROMPT_USER.length + PROMPT_HOST.length + 1), 'dim')],
        [seg('OS: ', 'accent'), seg(TRANSLATIONS.aboutPortfolioOS[ctx.lang])],
        [seg('Shell: ', 'accent'), seg('zsh')],
        [
          seg(`${t('aboutPortfolioRole', ctx)}: `, 'accent'),
          seg(TRANSLATIONS.aboutPortfolioRoleValue[ctx.lang]),
        ],
        [
          seg(`${t('aboutPortfolioLocation', ctx)}: `, 'accent'),
          seg(TRANSLATIONS.aboutPortfolioLocationValue[ctx.lang]),
        ],
        [
          seg(`${t('aboutPortfolioFocus', ctx)}: `, 'accent'),
          seg(TRANSLATIONS.aboutPortfolioFocusValue[ctx.lang]),
        ],
      ];
      const height = Math.max(MONOGRAM.length, info.length);
      const rows: TerminalRow[] = [BLANK];
      for (let i = 0; i < height; i++) {
        const art = seg(INDENT + pad(MONOGRAM[i] ?? '', MONOGRAM[0].length) + '   ', 'accent');
        rows.push([art, ...(info[i] ?? [])]);
      }
      rows.push(BLANK);
      return rows;
    },
  },
  {
    name: 'whoami',
    descriptionKey: 'cmdWhoamiDesc',
    run() {
      return [[seg(PROMPT_USER)]];
    },
  },
  {
    name: 'pwd',
    descriptionKey: 'cmdPwdDesc',
    run() {
      return [[seg(HOME_PATH)]];
    },
  },
  {
    name: 'date',
    descriptionKey: 'cmdDateDesc',
    run(_args, ctx) {
      const formatted = new Intl.DateTimeFormat(ctx.locale, {
        dateStyle: 'full',
        timeStyle: 'medium',
      }).format(ctx.now);
      return [[seg(formatted)]];
    },
  },
  {
    name: 'echo',
    descriptionKey: 'cmdEchoDesc',
    usage: '<text>',
    run(args) {
      return [[seg(args.join(' '))]];
    },
  },
  {
    name: 'history',
    descriptionKey: 'cmdHistoryDesc',
    run(_args, ctx) {
      if (ctx.history.length === 0) {
        return [[seg(t('terminalNoHistory', ctx), 'dim')]];
      }
      const width = String(ctx.history.length).length;
      return ctx.history.map((entry, i) => [
        seg(INDENT + String(i + 1).padStart(width, ' ') + '  ', 'dim'),
        seg(entry),
      ]);
    },
  },
  {
    name: 'clear',
    descriptionKey: 'cmdClearDesc',
    run() {
      return null;
    },
  },
  {
    name: 'sudo',
    descriptionKey: 'cmdSudoDesc',
    run(_args, ctx) {
      return [[seg(t('terminalSudoJoke', ctx), 'error')]];
    },
  },
];

export const COMMAND_NAMES: readonly string[] = COMMANDS.map((cmd) => cmd.name);

/**
 * `karim@karimagine ~ %` — zsh's `%`, the macOS default shell since Catalina.
 * Kept as segments so the live prompt and the echoed scrollback rows are tinted
 * by the same source instead of drifting apart.
 */
export const PROMPT_SEGMENTS: TerminalRow = [
  seg(`${PROMPT_USER}@${PROMPT_HOST}`, 'accent'),
  seg(' ~ ', 'dim'),
  seg('%', 'success'),
];

/**
 * Turns typed input into output rows. Pure: same input and context, same rows.
 * `null` means the caller should wipe the scrollback.
 */
export function runCommand(input: string, ctx: CommandContext): TerminalRow[] | null {
  const [verb, ...args] = input.trim().split(/\s+/).filter(Boolean);
  if (verb === undefined) {
    return [];
  }
  const command = COMMANDS.find((cmd) => cmd.name === verb);
  if (!command) {
    // The real zsh wording, verbatim — a translated error would break the illusion.
    return [[seg(`zsh: command not found: ${verb}`, 'error')]];
  }
  return command.run(args, ctx);
}

/**
 * Tab completion. Returns the single match to apply, or the candidate list to
 * print when the prefix is ambiguous — the same two behaviours a real shell has.
 */
export function completeCommand(
  prefix: string,
): { kind: 'single'; name: string } | { kind: 'many'; names: readonly string[] } | null {
  const trimmed = prefix.trimStart();
  // Only the verb completes; arguments have no completion source here.
  if (trimmed.length === 0 || trimmed.includes(' ')) {
    return null;
  }
  const matches = COMMAND_NAMES.filter((name) => name.startsWith(trimmed));
  if (matches.length === 0) return null;
  if (matches.length === 1) return { kind: 'single', name: matches[0] };
  return { kind: 'many', names: matches };
}
