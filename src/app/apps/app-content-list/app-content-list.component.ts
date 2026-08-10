import { Component, input } from '@angular/core';
import { ListItem } from '../../content/content.model';

@Component({
  selector: 'app-content-list',
  templateUrl: './app-content-list.component.html',
  styleUrl: './app-content-list.component.scss',
})
export class AppContentListComponent {
  readonly heading = input.required<string>();
  readonly items = input.required<ListItem[]>();
}
