import { DestroyRef, ElementRef, Signal, afterNextRender, inject, signal } from '@angular/core';

export interface ChartSize {
  width: number;
  height: number;
}

/**
 * Content box of the calling component's host element, kept in sync with a ResizeObserver, so a
 * chart can fill whatever room the window gives it. Prerender has no layout, so it returns
 * `fallback` there; the first browser render replaces it.
 */
export function injectChartSize(fallback: ChartSize): Signal<ChartSize> {
  const host = inject<ElementRef<HTMLElement>>(ElementRef);
  const destroyRef = inject(DestroyRef);
  const size = signal(fallback);
  afterNextRender(() => {
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      if (width > 0 && height > 0) size.set({ width, height });
    });
    observer.observe(host.nativeElement);
    destroyRef.onDestroy(() => observer.disconnect());
  });
  return size.asReadonly();
}
