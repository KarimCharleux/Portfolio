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
import { TreejsComponent } from "./projet/threeJS/treejs.component";
import { VanlifeComponent } from "./projet/vanlife/vanlife.component";
import { CardEffectComponent } from "./projet/card-effect/card-effect.component";

const appRouteList: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instarand', component: InstaRandComponent },
  { path: 'snchess', component: SnchessComponent },
  { path: 'treejs', component: TreejsComponent },
  { path: 'vanlife', component: VanlifeComponent },
  { path: 'card-effect', component: CardEffectComponent },
  {
    path: 'le-monde-du-vtt',
    component: LeMondeDuVttComponent,
    children: [
      { path: '', component: VttHomeComponent, data: { animation: 'isHome' } },
      { path: 'xc', component: VttXcComponent , data: { animation: 'isFirst' }},
      { path: 'dh', component: VttDhComponent , data: { animation: 'isSecond' }},
      { path: 'trial', component: VttTrialComponent , data: { animation: 'isThird' }},
      { path: 'contact', component: VttContactComponent, data: { animation: 'isContact' } }
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
