import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-instarand',
  templateUrl: './insta-rand.component.html',
  styleUrls: ['./insta-rand.component.scss']
})
export class InstaRandComponent {

  isLoading = true;
  loadingDuration = 2000;

  constructor(private titleService: Title) {
    this.titleService.setTitle("InstaRand - Home");


    // Simulate a 2 seconds loading
    setTimeout(() => {
      this.isLoading = false;
    }, this.loadingDuration);
  }

}
