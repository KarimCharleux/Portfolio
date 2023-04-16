import { Component, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import '../variables.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN' }
  ]
})
export class AppComponent {

  isLoading = true;
  loadingDuration = 2000;

  constructor() {
    registerLocaleData(fr.default);

    // Simuler un chargement de 2 secondes
    setTimeout(() => {
      this.isLoading = false;
    }, this.loadingDuration);
  }
}

