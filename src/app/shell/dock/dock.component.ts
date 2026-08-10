import { Component, inject, signal } from '@angular/core';
import { AppIconComponent } from '../../apps/app-icon/app-icon.component';
import { DOCK_APPS } from '../../core/dock-apps/dock-apps.data';
import { DockAppDef } from '../../core/dock-apps/dock-app.model';
import { AppId } from '../../core/window-manager/window.model';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-dock',
  imports: [AppIconComponent],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
})
export class DockComponent {
  private readonly windowManager = inject(WindowManagerService);

  protected readonly apps = DOCK_APPS;
  private readonly hoveredIndex = signal<number | null>(null);

  scaleFor(index: number): number {
    const hovered = this.hoveredIndex();
    if (hovered === null) return 1;
    const distance = Math.abs(index - hovered);
    if (distance === 0) return 1.6;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;
    return 1;
  }

  isOpen(appId: AppId): boolean {
    return this.windowManager.isOpen(appId);
  }

  onIconEnter(index: number): void {
    this.hoveredIndex.set(index);
  }

  onDockLeave(): void {
    this.hoveredIndex.set(null);
  }

  open(app: DockAppDef): void {
    this.windowManager.open(app.id, app.label);
  }
}
