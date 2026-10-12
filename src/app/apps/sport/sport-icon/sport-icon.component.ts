import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SportKey } from '../../../content/sport.model';

export type SportIconName = SportKey | 'trophy' | 'flag' | 'sparkles' | 'calendar';

/** Original line icons on a 24px grid, stroked with `currentColor` (circles drawn as two arcs). */
const ICONS: Record<SportIconName, readonly string[]> = {
  run: [
    'M16.6 4.5a1.6 1.6 0 1 1-3.2 0a1.6 1.6 0 1 1 3.2 0',
    'M13 8l-2 5',
    'M13 8l-3.5 1-2 2.5',
    'M13 8l3 2.5h3',
    'M11 13l3 2.5-1 4.5',
    'M11 13l-2 3.5H5',
  ],
  ride: [
    'M9.5 16a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0',
    'M21.5 16a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0',
    'M6 16l4-7h5.5',
    'M10 9l2 7H6',
    'M12 16l3.5-7 2.5 7',
    'M8.5 7.5h3',
    'M14 6.5h2.5',
  ],
  swim: [
    'M17.6 7a1.6 1.6 0 1 1-3.2 0a1.6 1.6 0 1 1 3.2 0',
    'M5 12l4.5-3.5 3.5 3 3-2.5',
    'M3 16c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1',
    'M3 20c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1',
  ],
  hike: ['M3 19l6.5-11 4 6.5 2.5-3.5 5 8z', 'M8 10.5l1.5 1.5 1.5-1.5'],
  walk: [
    'M7.5 4c1.6 0 2.4 1.8 2.4 4s-1 3.5-2.4 3.5S5.1 10.2 5.1 8 5.9 4 7.5 4z',
    'M6 14h3v1.5a1.5 1.5 0 0 1-3 0z',
    'M16.5 8.5c1.6 0 2.4 1.8 2.4 4s-1 3.5-2.4 3.5-2.4-1.3-2.4-3.5.8-4 2.4-4z',
    'M15 18.5h3V20a1.5 1.5 0 0 1-3 0z',
  ],
  trophy: [
    'M7 4h10v5a5 5 0 0 1-10 0z',
    'M7 6H4v1a3 3 0 0 0 3 3',
    'M17 6h3v1a3 3 0 0 1-3 3',
    'M12 14v3',
    'M8.5 20.5V17h7v3.5z',
  ],
  flag: ['M5 21V4', 'M5 4h12l-2.5 4 2.5 4H5'],
  sparkles: [
    'M11 3l1.8 4.7 4.7 1.8-4.7 1.8L11 16l-1.8-4.7-4.7-1.8 4.7-1.8z',
    'M18.5 14l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z',
  ],
  calendar: [
    'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
    'M4 10h16',
    'M8 3v4',
    'M16 3v4',
  ],
};

/** Decorative icon: always next to a text label, so hidden from assistive tech. */
@Component({
  selector: 'app-sport-icon',
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      @for (d of paths(); track d) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styleUrl: './sport-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportIconComponent {
  readonly name = input.required<SportIconName>();

  protected readonly paths = computed(() => ICONS[this.name()]);
}
