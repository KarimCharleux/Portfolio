import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { InstaRandComponent } from "./insta-rand/insta-rand.component";

export const appRouteList: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instarand', component: InstaRandComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouteList)
  ]
})

export class AppRoutingModule {
}
