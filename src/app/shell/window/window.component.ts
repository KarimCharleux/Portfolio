import { Component, computed, inject, input } from '@angular/core';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';
import { WindowState } from '../../core/window-manager/window.model';
import { I18nService } from '../../core/i18n/i18n.service';

const MIN_WIDTH = 320;
const MIN_HEIGHT = 240;
const MENU_BAR_HEIGHT = 24;

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent {
  private readonly windowManager = inject(WindowManagerService);
  protected readonly i18n = inject(I18nService);

  readonly state = input.required<WindowState>();

  // The About panel is a fixed macOS-style utility window: no minimize, no
  // resize, matching how the real "About This Mac" panel behaves.
  protected readonly isFixedChrome = computed(() => this.state().appId === 'about');

  isFocused(): boolean {
    return this.windowManager.frontmost()?.id === this.state().id;
  }

  focus(): void {
    this.windowManager.focus(this.state().id);
  }

  close(): void {
    this.windowManager.close(this.state().id);
  }

  minimize(): void {
    if (this.isFixedChrome()) return;
    this.windowManager.minimize(this.state().id);
  }

  onTitleBarPointerDown(event: PointerEvent): void {
    const current = this.state();
    this.windowManager.focus(current.id);

    const startX = event.clientX;
    const startY = event.clientY;
    const originX = current.x;
    const originY = current.y;

    const onMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const maxX = Math.max(window.innerWidth - current.width, 0);
      const maxY = Math.max(window.innerHeight - current.height, MENU_BAR_HEIGHT);
      const nextX = Math.min(Math.max(originX + dx, 0), maxX);
      const nextY = Math.min(Math.max(originY + dy, MENU_BAR_HEIGHT), maxY);
      this.windowManager.move(current.id, nextX, nextY);
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  onResizeHandlePointerDown(event: PointerEvent): void {
    event.stopPropagation();
    const current = this.state();
    this.windowManager.focus(current.id);

    const startX = event.clientX;
    const startY = event.clientY;
    const originWidth = current.width;
    const originHeight = current.height;

    const onMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const maxWidth = Math.max(window.innerWidth - current.x, MIN_WIDTH);
      const maxHeight = Math.max(window.innerHeight - current.y, MIN_HEIGHT);
      const width = Math.min(Math.max(originWidth + dx, MIN_WIDTH), maxWidth);
      const height = Math.min(Math.max(originHeight + dy, MIN_HEIGHT), maxHeight);
      this.windowManager.resize(current.id, width, height);
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
