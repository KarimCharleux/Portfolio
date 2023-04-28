import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { slider } from './route-animation'
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-le-monde-du-vtt',
  templateUrl: './le-monde-du-vtt.component.html',
  styleUrls: ['./le-monde-du-vtt.component.scss'],
  animations: [
    slider
  ]
})
export class LeMondeDuVttComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Le monde du VTT - Home");
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  onActivate() {
    window.scroll({
      top: 0
    });
  }
}
