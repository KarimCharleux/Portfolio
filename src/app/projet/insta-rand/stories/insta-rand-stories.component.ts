import { Component } from '@angular/core';

@Component({
  selector: 'app-insta-rand-stories',
  templateUrl: './insta-rand-stories.component.html',
  styleUrls: ['./insta-rand-stories.component.scss']
})
export class InstaRandStoriesComponent {
  allStories: string[];

  constructor() {
    this.allStories = [
      "karim.chrx",
      "julien_",
      "vbrequin",
      "hardisk",
      "batp.rlt"
    ];

    this.allStories.sort(() => Math.random() - 0.5);
  }
}
