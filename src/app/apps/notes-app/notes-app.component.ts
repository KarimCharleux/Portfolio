import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { NOTES } from '../../content/notes.data';

interface NoteSegment {
  readonly text: string;
  readonly bold: boolean;
}

function parseBoldSegments(line: string): NoteSegment[] {
  return line
    .split(/\*\*(.+?)\*\*/)
    .map((text, i) => ({ text, bold: i % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes-app.component.html',
  styleUrl: './notes-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesAppComponent {
  protected readonly i18n = inject(I18nService);

  protected readonly heading = computed(() => this.i18n.t('aboutMe'));
  protected readonly sections = computed(() => NOTES[this.i18n.lang()]);

  protected readonly parseLine = parseBoldSegments;
}
