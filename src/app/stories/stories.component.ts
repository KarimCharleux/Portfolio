import { Component } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  allStories: string[];

  constructor() {
    this.allStories = [
      "karim.chrx",
      "julien_",
      "vbrequin",
      "hardisk",
      "batp.rlt"
    ];

    // Trié aléatoirement les stories
    this.allStories.sort(() => Math.random() - 0.5);
  }
}
