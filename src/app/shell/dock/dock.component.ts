import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { AppId } from '../../core/window-manager/window.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

const MAX_SCALE = 1.7;
const INFLUENCE_PX = 110;
const TOOLTIP_DELAY_MS = 350;

@Component({
  selector: 'app-dock',
  imports: [AppIconComponent],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
})
export class DockComponent {
  private readonly windowManager = inject(WindowManagerService);

  @ViewChildren('dockIcon') private readonly iconEls!: QueryList<ElementRef<HTMLButtonElement>>;

  protected readonly apps = DOCK_APPS;
  protected readonly hoveredApp = signal<AppId | null>(null);
  private readonly scales = signal<Record<string, number>>({});
  private tooltipTimer: ReturnType<typeof setTimeout> | null = null;

  scaleFor(appId: AppId): number {
    return this.scales()[appId] ?? 1;
  }

  onDockPointerMove(event: PointerEvent): void {
    const mouseX = event.clientX;
    const next: Record<string, number> = {};
    this.iconEls.forEach((ref) => {
      const el = ref.nativeElement;
      const appId = el.dataset['appId'] as AppId;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - centerX);
      const falloff = Math.exp(-(distance * distance) / (2 * INFLUENCE_PX * INFLUENCE_PX));
      next[appId] = 1 + (MAX_SCALE - 1) * falloff;
    });
    this.scales.set(next);
  }

  onDockLeave(): void {
    this.scales.set({});
    this.clearTooltip();
  }

  onIconPointerEnter(appId: AppId): void {
    this.clearTooltip();
    this.tooltipTimer = setTimeout(() => this.hoveredApp.set(appId), TOOLTIP_DELAY_MS);
  }

  onIconPointerLeave(): void {
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
