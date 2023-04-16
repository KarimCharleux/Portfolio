import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PosteInstaComponent } from './poste-insta/poste-insta.component';
import { InstaFeedComponent } from './insta-feed/insta-feed.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingComponent } from './loading/loading.component';
import { InstaRandComponent } from './insta-rand/insta-rand.component';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from "@angular/router";
import { StoriesComponent } from './stories/stories.component';

@NgModule({
  declarations: [
    AppComponent,
    PosteInstaComponent,
    InstaFeedComponent,
    HeaderComponent,
    LoadingComponent,
    InstaRandComponent,
    HomeComponent,
    StoriesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
