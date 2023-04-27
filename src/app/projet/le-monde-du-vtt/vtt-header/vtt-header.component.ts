import { Component } from '@angular/core';

@Component({
  selector: 'app-vtt-header',
  templateUrl: './vtt-header.component.html',
  styleUrls: ['./vtt-header.component.scss']
})
export class VttHeaderComponent {

  showMenu() {
    const menu = document.querySelector('nav');
    if (menu === null) return;
    menu.classList.toggle('show');
  }

  disableMenu() {
    const menu = document.querySelector('nav');
    if (menu === null) return;
    menu.classList.remove('show');
  }
}
