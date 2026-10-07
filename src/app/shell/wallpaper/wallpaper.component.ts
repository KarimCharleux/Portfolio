import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AssetPreloaderService } from '../../core/asset-preloader/asset-preloader.service';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrl: './wallpaper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WallpaperComponent {
  readonly #preloader = inject(AssetPreloaderService);

  /** Slightly zoomed in while the boot screen is up; settles to 1× as the Aurora reveal plays. */
  readonly zoomed = input(false);

  protected readonly loaded = this.#preloader.wallpaperLoaded;

  constructor() {
    this.#preloader.preloadAll();
  }
}
