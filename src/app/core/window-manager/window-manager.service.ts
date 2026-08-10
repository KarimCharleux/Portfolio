import { Injectable, computed, signal } from '@angular/core';
import { AppId, WindowState } from './window.model';

const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 480;
const CASCADE_OFFSET = 32;
const INITIAL_X = 80;
const INITIAL_Y = 60;

@Injectable({ providedIn: 'root' })
export class WindowManagerService {
  private readonly windowsSignal = signal<WindowState[]>([]);
  private nextZIndex = 1;
  private nextInstanceId = 0;

  readonly windows = this.windowsSignal.asReadonly();

  readonly frontmost = computed<WindowState | null>(() => {
    const open = this.windowsSignal().filter((w) => !w.minimized);
    if (open.length === 0) return null;
    return open.reduce((top, w) => (w.zIndex > top.zIndex ? w : top));
  });

  open(appId: AppId, title: string): void {
    const existing = this.windowsSignal().find((w) => w.appId === appId);
    if (existing) {
      this.restore(existing.id);
      this.focus(existing.id);
      return;
    }
    const count = this.windowsSignal().length;
    const id = `win-${this.nextInstanceId++}`;
    const win: WindowState = {
      id,
      appId,
      title,
      x: INITIAL_X + count * CASCADE_OFFSET,
      y: INITIAL_Y + count * CASCADE_OFFSET,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      zIndex: this.nextZIndex++,
      minimized: false,
    };
    this.windowsSignal.update((wins) => [...wins, win]);
  }

  close(id: string): void {
    this.windowsSignal.update((wins) => wins.filter((w) => w.id !== id));
  }

  minimize(id: string): void {
    this.windowsSignal.update((wins) =>
      wins.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
  }

  restore(id: string): void {
    this.windowsSignal.update((wins) =>
      wins.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
    );
  }

  focus(id: string): void {
    const zIndex = this.nextZIndex++;
    this.windowsSignal.update((wins) => wins.map((w) => (w.id === id ? { ...w, zIndex } : w)));
  }

  move(id: string, x: number, y: number): void {
    this.windowsSignal.update((wins) => wins.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }

  resize(id: string, width: number, height: number): void {
    this.windowsSignal.update((wins) =>
      wins.map((w) => (w.id === id ? { ...w, width, height } : w)),
    );
  }

  isOpen(appId: AppId): boolean {
    return this.windowsSignal().some((w) => w.appId === appId);
  }
}
