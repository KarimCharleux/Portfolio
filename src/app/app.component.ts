import {AfterViewInit, Component, LOCALE_ID} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AngularFireAnalytics} from "@angular/fire/compat/analytics";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-EN'}
  ]
})
export class AppComponent implements AfterViewInit {
  constructor(private titleService: Title,
              private analyticsModule: AngularFireAnalytics) {
    this.titleService.setTitle("Karim CHARLEUX - Portfolio");
  }

  ngAfterViewInit() {

    this.analyticsModule.logEvent('page_view', {page_path: window.location.pathname}).then(r => console.log(r));
  }

}
