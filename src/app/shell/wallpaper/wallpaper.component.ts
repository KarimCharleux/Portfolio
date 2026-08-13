import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AssetPreloaderService } from '../../core/asset-preloader/asset-preloader.service';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrl: './wallpaper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WallpaperComponent {
  readonly #preloader = inject(AssetPreloaderService);

  protected readonly loaded = this.#preloader.wallpaperLoaded;

  constructor() {
    this.#preloader.preloadAll();
  }
}
