import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CursorService } from '../../core/cursor/cursor.service';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.cursor--pointer]': "cursor.variant() === 'pointer'",
    '[class.cursor--loading]': "cursor.variant() === 'loading'",
    '[style.transform]': 'transform()',
    '[style.opacity]': 'visible() ? 1 : 0',
  },
})
export class CursorComponent {
  protected readonly cursor = inject(CursorService);

  protected readonly transform = computed(
    () => `translate(${this.cursor.x()}px, ${this.cursor.y()}px) rotate(${this.cursor.angle()}deg)`,
  );

  protected readonly visible = computed(
    () => this.cursor.active() && this.cursor.focused() && !this.cursor.insideNotch(),
  );
}
