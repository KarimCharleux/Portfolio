import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { Photo } from '../../content/content.model';
import { PHOTOS } from '../../content/photos.data';

const COLUMN_COUNT = 5;
/** Seconds per full loop, one per column — deliberately uneven so columns desync visually. */
const COLUMN_DURATIONS_S = [36, 42, 48, 40, 46] as const;

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

  protected readonly columns = computed(() => buildColumns(PHOTOS));

  readonly #photoIndex = new Map(PHOTOS.map((photo, i) => [photo.id, i + 1]));

  protected altFor(photo: Photo): string {
    return `${this.i18n.t('photoAlt')} ${this.#photoIndex.get(photo.id)}`;
  }

  protected open(photo: Photo): void {
    this.#selectedPhoto.set(photo);
  }

  protected close(): void {
    this.#selectedPhoto.set(null);
  }
}
