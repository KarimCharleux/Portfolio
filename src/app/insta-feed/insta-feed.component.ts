import { Component } from '@angular/core';
import { PosteInsta } from "../class/PosteInsta";

@Component({
  selector: 'app-insta-feed',
  templateUrl: './insta-feed.component.html',
  styleUrls: ['./insta-feed.component.scss']
})
export class InstaFeedComponent {
  postesInsta: PosteInsta[];

  constructor() {
    this.postesInsta = [
      new PosteInsta(1, "Un moment de détente bien mérité après une journée bien remplie 🧘‍♀️ #yoga #zen #relaxation", "Karim CHARLEUX", "Paris, France"),
      new PosteInsta(2, "En train de savourer un délicieux latte art ☕️ #coffeeaddict #latteart #coffeelover", "Raphael POUPON"),
      new PosteInsta(3, "Un petit avant-goût de notre prochaine collection été 🌸 #fashion #mode #nouveautés", "Arthur POUCHET", "Lyon, France"),
      new PosteInsta(4, "Une vue imprenable sur la ville depuis notre rooftop 🌇 #skyline #cityview #urbanlife", "Anis FARAH", "Valence, Espagne"),
      new PosteInsta(5, "Un après-midi de balade à vélo au bord de la mer 🚴‍♀️🌊 #cycling #beachlife #outdoorfun", "Angie MARQUETTE", "Livrons-sur-Drôme, France")
    ]; // Ou avec postesInsta.push()
  }
}
