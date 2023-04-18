import { Component, Input } from '@angular/core';
import { PostInsta } from "./PostInsta";

@Component({
  selector: 'app-insta-rand-post',
  templateUrl: './insta-rand-post.component.html',
  styleUrls: ['./insta-rand-post.component.scss']
})
export class InstaRandPostComponent {
  @Input() postInsta!: PostInsta;

  onAddLike() {
    if (this.postInsta.clicked) {
      this.postInsta.likes--;
      this.postInsta.likeColor = "#000000";
      this.postInsta.clicked = false;
      this.postInsta.textColor = "black";
      this.postInsta.likeType = "pnhskdva";
    } else {
      this.postInsta.likes++;
      this.postInsta.likeColor = "#e83a30";
      this.postInsta.clicked = true;
      this.postInsta.textColor = "red";
      this.postInsta.likeType = "xryjrepg";
    }
  }

  onClickSave() {
    if (this.postInsta.saveType === "gigfpovs") {
      this.postInsta.saveType = "eanmttmw";
    } else {
      this.postInsta.saveType = "gigfpovs";
    }
  }
}
