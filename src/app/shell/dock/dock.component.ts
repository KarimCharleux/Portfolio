import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { AppId } from '../../core/window-manager/window.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { I18nService } from '../../core/i18n/i18n.service';

// Same tiered magnification as https://codepen.io/kokotsakis/pen/XWVPLee,
// scaled down — still too strong at 1.4/1.15/1.03, dialed back further.
const TIERS = [
  { scale: 1.22, lift: -5 },
  { scale: 1.08, lift: -2 },
  { scale: 1.02, lift: 0 },
];

@Component({
  selector: 'app-dock',
  imports: [AppIconComponent],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockComponent {
  readonly #windowManager = inject(WindowManagerService);
  protected readonly i18n = inject(I18nService);

  protected readonly apps = DOCK_APPS;
  protected readonly hoveredApp = signal<AppId | null>(null);
  readonly #hoveredIndex = signal<number | null>(null);

  transformFor(index: number): string {
    const hovered = this.#hoveredIndex();
    if (hovered === null) return 'scale(1) translateY(0px)';
    const distance = Math.abs(index - hovered);
    const tier = TIERS[distance];
    if (!tier) return 'scale(1) translateY(0px)';
    return `scale(${tier.scale}) translateY(${tier.lift}px)`;
  }

  isHovered(index: number): boolean {
    return this.#hoveredIndex() === index;
  }

  onIconEnter(index: number, appId: AppId): void {
    this.#hoveredIndex.set(index);
    this.hoveredApp.set(appId);
  }

  onDockLeave(): void {
    this.#hoveredIndex.set(null);
    this.hoveredApp.set(null);
  }

  isOpen(appId: AppId): boolean {
    return this.#windowManager.isOpen(appId);
  }

  open(app: DockAppDef): void {
    if (app.noWindow) return;
    this.#windowManager.open(app.id, app.label);
  }
}
