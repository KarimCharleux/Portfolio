import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirebaseApp } from './core/firebase-app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    afterNextRender(() => {
      try {
        const analytics = getAnalytics(getFirebaseApp());
        logEvent(analytics, 'page_view', { page_path: window.location.pathname });
      } catch (err) {
        console.error(err);
      }
    });
  }
}
