import { Component, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN' }
  ]
})

export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Karim CHARLEUX - Portfolio");
  }
}

