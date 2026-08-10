import { Component, input } from '@angular/core';
import { GridItem } from '../../content/content.model';

@Component({
  selector: 'app-content-grid',
  templateUrl: './app-content-grid.component.html',
  styleUrl: './app-content-grid.component.scss',
})
export class AppContentGridComponent {
  readonly heading = input.required<string>();
  readonly items = input.required<GridItem[]>();
}
