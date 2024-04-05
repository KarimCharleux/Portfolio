import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-effect',
  templateUrl: './card-effect.component.html',
  styleUrls: ['./card-effect.component.scss']
})
export class CardEffectComponent implements OnInit {
  ngOnInit() {
    this.create3DCards();
  }

  create3DCards() {

    // Movement Animation to happen
    const card = document.querySelector(".project") as HTMLElement;
    const container = document.querySelector(".project-container") as HTMLElement;

    // Items
    const title = document.querySelector(".project-title") as HTMLElement;
    const sneaker = document.querySelector(".project-image") as HTMLImageElement;
    const description = document.querySelector(".project-desc") as HTMLElement;
    const sizes = document.querySelector(".project-tags") as HTMLElement;

    // Moving Animation Event
    container.addEventListener("mousemove", (e: MouseEvent) => {
      let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Animate In
    container.addEventListener("mouseenter", () => {
      card.style.transition = "none";
      // Popout
      title.style.transform = "translateZ(100px)";
      sneaker.style.transform = "translateZ(125px) rotateZ(-45deg)";
      description.style.transform = "translateZ(110px)";
      sizes.style.transform = "translateZ(125px)";
    });

    // Animate Out
    container.addEventListener("mouseleave", () => {
      card.style.transition = "all 0.5s ease";
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
      // Pop back
      title.style.transform = "translateZ(0px)";
      sneaker.style.transform = "translateZ(0px) rotateZ(0deg)";
      description.style.transform = "translateZ(0px)";
      sizes.style.transform = "translateZ(0px)";
    });
  }
}
