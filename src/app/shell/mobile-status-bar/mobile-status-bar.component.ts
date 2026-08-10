import { Component, computed, inject } from '@angular/core';
import { ClockService } from '../../core/clock/clock.service';

@Component({
  selector: 'app-mobile-status-bar',
  templateUrl: './mobile-status-bar.component.html',
  styleUrl: './mobile-status-bar.component.scss',
})
export class MobileStatusBarComponent {
  private readonly clock = inject(ClockService);

  protected readonly formattedTime = computed(() =>
    new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(
      this.clock.now(),
    ),
  );
}
