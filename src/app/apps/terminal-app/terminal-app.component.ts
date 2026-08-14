import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  afterRenderEffect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { I18nService } from '../../core/i18n/i18n.service';
import { PROMPT_SEGMENTS, completeCommand, runCommand } from '../../content/terminal-commands.data';
import { CommandContext, TerminalLine, TerminalRow } from '../../content/terminal.model';

/** Terminal.app's tty for the first window of a session. */
const TTY = 'ttys000';

/**
 * `Thu Aug 14 10:23:45` — the C-locale shape `login` prints, so it is built with
 * a fixed `en-US` formatter rather than the visitor's locale.
 */
function loginTimestamp(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';
  // `date` space-pads single-digit days: "Aug  4", not "Aug 4".
  const day = get('day').padStart(2, ' ');
  return `${get('weekday')} ${get('month')} ${day} ${get('hour')}:${get('minute')}:${get('second')}`;
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal-app.component.html',
  styleUrl: './terminal-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalAppComponent {
  readonly #i18n = inject(I18nService);
  readonly #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // `protected`, not `#private`: Angular rejects signal queries on ES private
  // fields (NG1053), so the project's `#field` rule cannot apply here.
  protected readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');
  protected readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('input');

  readonly #lines = signal<TerminalLine[]>([]);
  readonly #draft = signal('');
  readonly #history = signal<string[]>([]);
  /** Cursor into history; -1 means "editing a fresh line". */
  readonly #historyIndex = signal(-1);

  #nextLineId = 0;
  /** The in-progress line parked while the visitor walks back through history. */
  #stashedDraft = '';

  protected readonly lines = this.#lines.asReadonly();
  protected readonly draft = this.#draft.asReadonly();
  protected readonly promptSegments = PROMPT_SEGMENTS;
  protected readonly i18n = this.#i18n;

  constructor() {
    if (this.#isBrowser) {
      this.#seed();
    }

    // Terminal.app opens ready to type, so the prompt takes focus straight away
    // rather than waiting for a click on the body.
    afterNextRender(() => this.focusInput());

    // Re-runs after every render that changed the scrollback. `afterRenderEffect`
    // never runs on the server, which is what keeps the prerender safe.
    afterRenderEffect(() => {
      this.#lines();
      const el = this.scroller().nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  }

  protected onInput(event: Event): void {
    this.#draft.set((event.target as HTMLInputElement).value);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      this.#clear();
      return;
    }
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.#submit();
        return;
      case 'ArrowUp':
        event.preventDefault();
        this.#walkHistory(-1);
        return;
      case 'ArrowDown':
        event.preventDefault();
        this.#walkHistory(1);
        return;
      case 'Tab':
        event.preventDefault();
        this.#complete();
        return;
      default:
        return;
    }
  }

  /** Clicking anywhere in the terminal body focuses the prompt, as Terminal.app does. */
  protected focusInput(): void {
    this.inputEl().nativeElement.focus();
  }

  #seed(): void {
    this.#append([
      [{ text: `Last login: ${loginTimestamp(new Date())} on ${TTY}`, tone: 'dim' }],
      [],
      [
        { text: '  ' + this.#i18n.t('terminalHintBefore'), tone: 'dim' },
        { text: 'help', tone: 'accent' },
        { text: this.#i18n.t('terminalHintAfter'), tone: 'dim' },
      ],
      [],
    ]);
  }

  #submit(): void {
    const input = this.#draft();
    this.#append([[...this.promptSegments, { text: ' ' + input, tone: 'default' }]]);
    this.#draft.set('');
    this.#historyIndex.set(-1);
    this.#stashedDraft = '';

    const output = runCommand(input, this.#context());
    if (output === null) {
      this.#lines.set([]);
    } else {
      this.#append(output);
    }

    if (input.trim().length > 0) {
      this.#history.update((entries) => [...entries, input.trim()]);
    }
  }

  #complete(): void {
    const match = completeCommand(this.#draft());
    if (match === null) return;
    if (match.kind === 'single') {
      this.#draft.set(match.name + ' ');
      return;
    }
    this.#append([
      [...this.promptSegments, { text: ' ' + this.#draft(), tone: 'default' }],
      [{ text: match.names.join('   '), tone: 'accent' }],
    ]);
  }

  #walkHistory(direction: -1 | 1): void {
    const entries = this.#history();
    if (entries.length === 0) return;

    const current = this.#historyIndex();
    if (current === -1) {
      if (direction === 1) return;
      // Park the half-typed line so walking back down restores it.
      this.#stashedDraft = this.#draft();
      this.#setHistory(entries.length - 1, entries);
      return;
    }

    const next = current + direction;
    if (next >= entries.length) {
      this.#historyIndex.set(-1);
      this.#draft.set(this.#stashedDraft);
      return;
    }
    this.#setHistory(Math.max(next, 0), entries);
  }

  #setHistory(index: number, entries: readonly string[]): void {
    this.#historyIndex.set(index);
    this.#draft.set(entries[index]);
  }

  #clear(): void {
    this.#lines.set([]);
    this.#draft.set('');
  }

  #context(): CommandContext {
    return {
      lang: this.#i18n.lang(),
      history: this.#history(),
      now: new Date(),
      locale: this.#i18n.locale(),
    };
  }

  #append(rows: readonly TerminalRow[]): void {
    const stamped = rows.map<TerminalLine>((segments) => ({
      id: `line-${this.#nextLineId++}`,
      segments,
    }));
    this.#lines.update((lines) => [...lines, ...stamped]);
  }
}
