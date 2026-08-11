import { Component, ElementRef, QueryList, ViewChildren, inject, signal } from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { AppId } from '../../core/window-manager/window.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { I18nService } from '../../core/i18n/i18n.service';

const MAX_SCALE = 1.35;
const INFLUENCE_PX = 85;
const TOOLTIP_DELAY_MS = 350;

@Component({
  selector: 'app-dock',
  imports: [AppIconComponent],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
})
export class DockComponent {
  private readonly windowManager = inject(WindowManagerService);
  protected readonly i18n = inject(I18nService);

  @ViewChildren('dockIcon') private readonly iconEls!: QueryList<ElementRef<HTMLButtonElement>>;

  protected readonly apps = DOCK_APPS;
  protected readonly hoveredApp = signal<AppId | null>(null);
  private readonly scales = signal<Record<string, number>>({});
  private nearestApp: AppId | null = null;
  private tooltipTimer: ReturnType<typeof setTimeout> | null = null;

  scaleFor(appId: AppId): number {
    return this.scales()[appId] ?? 1;
  }

  onDockPointerMove(event: PointerEvent): void {
    const mouseX = event.clientX;
    const next: Record<string, number> = {};
    let nearest: AppId | null = null;
    let nearestScale = -Infinity;

    this.iconEls.forEach((ref) => {
      const el = ref.nativeElement;
      const appId = el.dataset['appId'] as AppId;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - centerX);
      const falloff = Math.exp(-(distance * distance) / (2 * INFLUENCE_PX * INFLUENCE_PX));
      const scale = 1 + (MAX_SCALE - 1) * falloff;
      next[appId] = scale;
      if (scale > nearestScale) {
        nearestScale = scale;
        nearest = appId;
      }
    });

    this.scales.set(next);

    if (nearest !== this.nearestApp) {
      this.nearestApp = nearest;
      this.clearTooltip();
      this.hoveredApp.set(null);
      if (nearest) {
        this.tooltipTimer = setTimeout(() => this.hoveredApp.set(nearest), TOOLTIP_DELAY_MS);
      }
    }
  }

  onDockLeave(): void {
    this.scales.set({});
    this.nearestApp = null;
    this.clearTooltip();
    this.hoveredApp.set(null);
  }

  isOpen(appId: AppId): boolean {
    return this.windowManager.isOpen(appId);
  }

  open(app: DockAppDef): void {
    this.windowManager.open(app.id, app.label);
  }

  private clearTooltip(): void {
    if (this.tooltipTimer !== null) {
      clearTimeout(this.tooltipTimer);
      this.tooltipTimer = null;
    }
  }
}
