import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { InstaRandComponent } from "./projet/insta-rand/insta-rand.component";
import { LeMondeDuVttComponent } from "./projet/le-monde-du-vtt/le-monde-du-vtt.component";
import { SnchessComponent } from "./projet/snchess/snchess.component";
import { VttContactComponent } from "./projet/le-monde-du-vtt/vtt-contact/vtt-contact.component";

const appRouteList: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instarand', component: InstaRandComponent },
  { path: 'snchess', component: SnchessComponent },
  { path: 'le-monde-du-vtt', component: LeMondeDuVttComponent },
  { path: 'le-monde-du-vtt/contact', component: VttContactComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouteList)
  ]
})

export class AppRoutingModule {
}
