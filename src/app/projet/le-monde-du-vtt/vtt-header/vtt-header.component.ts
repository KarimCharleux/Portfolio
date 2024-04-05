import {Component} from '@angular/core';

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

    const hamburger = document.querySelector('#header-icon-list');
    if (hamburger === null) return;
    hamburger.classList.toggle('active');

    const meats = document.querySelectorAll('.meat');
    if (meats === null) return;
    meats.forEach(function (meat) {
      meat.classList.toggle('active');
    });
  }

  disableMenu() {
    const menu = document.querySelector('nav');
    if (menu === null) return;
    menu.classList.remove('show');
  }
}
