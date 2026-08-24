import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { Photo } from '../../content/content.model';
import { PHOTOS } from '../../content/photos.data';

const COLUMN_COUNT = 5;
/** Seconds per full loop, one per column — deliberately uneven so columns desync visually. */
const COLUMN_DURATIONS_S = [60, 68, 78, 64, 72] as const;

interface PhotoColumn {
  readonly photos: readonly Photo[];
  readonly durationS: number;
  readonly reverse: boolean;
}

function buildColumns(photos: readonly Photo[]): PhotoColumn[] {
  const buckets: Photo[][] = Array.from({ length: COLUMN_COUNT }, () => []);
  photos.forEach((photo, i) => buckets[i % COLUMN_COUNT].push(photo));
  return buckets.map((bucket, i) => ({
    photos: bucket,
    durationS: COLUMN_DURATIONS_S[i],
    reverse: i % 2 === 1,
  }));
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos-app.component.html',
  styleUrl: './photos-app.component.scss',
  host: {
    '(document:keydown.escape)': 'close()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosAppComponent {
  protected readonly i18n = inject(I18nService);

  readonly #selectedPhoto = signal<Photo | null>(null);
  protected readonly selectedPhoto = this.#selectedPhoto.asReadonly();

  protected readonly columns = buildColumns(PHOTOS);

  // `viewChild` cannot target a native `#field` — Angular's signal-query compiler requires a
  // TS-visible property, so this is the one place in this class that keeps the `protected`
  // keyword instead of `#`.
  protected readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  #lastFocused: HTMLElement | null = null;

  constructor() {
    // Moves focus into the lightbox the moment it opens (basic modal a11y) — a plain DOM call
    // rather than a template autofocus attribute, since the target only exists once
    // selectedPhoto() is truthy.
    effect(() => {
      if (this.selectedPhoto()) {
        this.closeButton()?.nativeElement.focus();
      }
    });
  }

  protected altFor(photo: Photo): string {
    const index = Number(photo.id.split('-')[1]);
    return `${this.i18n.t('photoAlt')} ${index}`;
  }

  protected open(photo: Photo): void {
    this.#lastFocused = document.activeElement as HTMLElement | null;
    this.#selectedPhoto.set(photo);
  }

  protected close(): void {
    this.#selectedPhoto.set(null);
    this.#lastFocused?.focus();
    this.#lastFocused = null;
  }

  // Tab lands on tiles further down a column than its `overflow: hidden` clip currently shows,
  // so the browser scrolls the column (its nearest scroll container) to bring the tile into
  // view — permanently desyncing it from the CSS transform loop, since the loop never resets
  // scrollTop. Reset it every time a tile inside the column receives focus.
  protected onColumnFocusIn(event: FocusEvent): void {
    (event.currentTarget as HTMLElement).scrollTop = 0;
  }
}
