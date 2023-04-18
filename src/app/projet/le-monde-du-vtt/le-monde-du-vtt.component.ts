import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-le-monde-du-vtt',
  templateUrl: './le-monde-du-vtt.component.html',
  styleUrls: ['./le-monde-du-vtt.component.scss']
})
export class LeMondeDuVttComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Le monde du VTT - Home");
  }
}
