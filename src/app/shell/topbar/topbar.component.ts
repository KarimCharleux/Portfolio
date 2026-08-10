import { Component, computed, inject, signal } from '@angular/core';
import { ClockService } from '../../core/clock/clock.service';
import { WindowManagerService } from '../../core/window-manager/window-manager.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private readonly clock = inject(ClockService);
  private readonly windowManager = inject(WindowManagerService);

  protected readonly darkMode = signal(false);

  protected readonly activeAppName = computed(
    () => this.windowManager.frontmost()?.title ?? 'Karim Charleux',
  );

  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(this.clock.now()),
  );

  toggleTheme(): void {
    this.darkMode.update((value) => !value);
    document.documentElement.dataset['theme'] = this.darkMode() ? 'dark' : 'light';
  }
}
