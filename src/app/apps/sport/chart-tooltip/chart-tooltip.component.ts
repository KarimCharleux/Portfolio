import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const OFFSET = 12;
const FLIP_MARGIN = 180;

@Component({
  selector: 'app-sport-chart-tooltip',
  template: '<ng-content />',
  styleUrl: './chart-tooltip.component.scss',
  host: {
    role: 'status',
    '[style.left.px]': 'left()',
    '[style.top.px]': 'y()',
    '[class.chart-tooltip--flipped]': 'flipped()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTooltipComponent {
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  readonly containerWidth = input.required<number>();

  protected readonly flipped = computed(() => this.x() > this.containerWidth() - FLIP_MARGIN);
  protected readonly left = computed(() =>
    this.flipped() ? this.x() - OFFSET : this.x() + OFFSET,
  );
}
