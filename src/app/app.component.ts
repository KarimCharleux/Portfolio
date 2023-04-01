import {Component, LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import * as fr from '@angular/common/locales/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-EN'}
  ]
})
export class AppComponent {
  constructor() {
    registerLocaleData(fr.default);
  }
}

