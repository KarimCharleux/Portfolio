import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CursorService } from '../../core/cursor/cursor.service';

// The arrow glyph's sharp tip sits at viewBox coords (3.41448, 3.41442), not
// at the SVG box's (0,0) origin — scaled to the host's 32px box (viewBox is
// 24px), that's this offset. Must match :host's transform-origin in
// cursor.component.scss so translate and rotate pivot around the same point.
const CURSOR_HOTSPOT_PX = (3.41448 / 24) * 32;

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
    () =>
      `translate(${this.cursor.x() - CURSOR_HOTSPOT_PX}px, ${this.cursor.y() - CURSOR_HOTSPOT_PX}px) rotate(${this.cursor.angle()}deg)`,
  );

  protected readonly visible = computed(
    () => this.cursor.active() && this.cursor.focused() && !this.cursor.insideNotch(),
  );
}
