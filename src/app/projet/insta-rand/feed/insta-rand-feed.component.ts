import { Component } from '@angular/core';
import { PostInsta } from "../post/PostInsta";

@Component({
  selector: 'app-insta-rand-feed',
  templateUrl: './insta-rand-feed.component.html',
  styleUrls: ['./insta-rand-feed.component.scss']
})
export class InstaRandFeedComponent {
  postsInsta: PostInsta[];

  constructor() {
    this.postsInsta = [
      new PostInsta(1, "Un moment de détente bien mérité après une journée bien remplie 🧘‍♀️ #yoga #zen #relaxation", "Karim CHARLEUX", "Paris, France"),
      new PostInsta(2, "En train de savourer un délicieux latte art ☕️ #coffeeaddict #latteart #coffeelover", "Raphael POUPON"),
      new PostInsta(3, "Un petit avant-goût de notre prochaine collection été 🌸 #fashion #mode #nouveautés", "Arthur POUCHET", "Lyon, France"),
      new PostInsta(4, "Une vue imprenable sur la ville depuis notre rooftop 🌇 #skyline #cityview #urbanlife", "Anis FARAH", "Valence, Espagne"),
      new PostInsta(5, "Un après-midi de balade à vélo au bord de la mer 🚴‍♀️🌊 #cycling #beachlife #outdoorfun", "Angie MARQUETTE", "Livrons-sur-Drôme, France")
    ]; // Or with postesInsta.push() method
  }
}
