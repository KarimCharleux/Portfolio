import { Component, Input } from '@angular/core';
import { PosteInsta } from "../class/PosteInsta";

@Component({
  selector: 'app-poste-insta',
  templateUrl: './poste-insta.component.html',
  styleUrls: ['./poste-insta.component.scss']
})
export class PosteInstaComponent {
  @Input() posteInsta!: PosteInsta;

  onAddLike() {
    if (this.posteInsta.clicked) {
      this.posteInsta.likes--;
      this.posteInsta.likeColor = "#000000";
      this.posteInsta.clicked = false;
      this.posteInsta.textColor = "black";
      this.posteInsta.likeType = "pnhskdva";
    } else {
      this.posteInsta.likes++;
      this.posteInsta.likeColor = "#e83a30";
      this.posteInsta.clicked = true;
      this.posteInsta.textColor = "red";
      this.posteInsta.likeType = "xryjrepg";
    }
  }

  onClickSave() {
    if (this.posteInsta.saveType === "gigfpovs") {
      this.posteInsta.saveType = "eanmttmw";
    } else {
      this.posteInsta.saveType = "gigfpovs";
    }
  }
}
