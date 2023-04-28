import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { InstaRandComponent } from "./projet/insta-rand/insta-rand.component";
import { LeMondeDuVttComponent } from "./projet/le-monde-du-vtt/le-monde-du-vtt.component";
import { SnchessComponent } from "./projet/snchess/snchess.component";
import { VttContactComponent } from "./projet/le-monde-du-vtt/vtt-contact/vtt-contact.component";
import { VttXcComponent } from "./projet/le-monde-du-vtt/vtt-xc/vtt-xc.component";
import { VttDhComponent } from "./projet/le-monde-du-vtt/vtt-dh/vtt-dh.component";
import { VttTrialComponent } from "./projet/le-monde-du-vtt/vtt-trial/vtt-trial.component";
import { VttHomeComponent } from "./projet/le-monde-du-vtt/vtt-home/vtt-home.component";

const appRouteList: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instarand', component: InstaRandComponent },
  { path: 'snchess', component: SnchessComponent },
  {
    path: 'le-monde-du-vtt',
    component: LeMondeDuVttComponent,
    children: [
      { path: '', component: VttHomeComponent },
      { path: 'contact', component: VttContactComponent },
      { path: 'xc', component: VttXcComponent },
      { path: 'dh', component: VttDhComponent },
      { path: 'trial', component: VttTrialComponent }
    ]
  },
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