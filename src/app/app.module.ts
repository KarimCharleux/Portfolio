import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InstaRandPostComponent } from './projet/insta-rand/post/insta-rand-post.component';
import { InstaRandFeedComponent } from './projet/insta-rand/feed/insta-rand-feed.component';
import { InstaRandHeaderComponent } from './projet/insta-rand/header/insta-rand-header.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InstaRandLoadingComponent } from './projet/insta-rand/loading/insta-rand-loading.component';
import { InstaRandComponent } from './projet/insta-rand/insta-rand.component';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from "@angular/router";
import { InstaRandStoriesComponent } from './projet/insta-rand/stories/insta-rand-stories.component';
import { AppRoutingModule } from './app-routing.module';
import { LeMondeDuVttComponent } from './projet/le-monde-du-vtt/le-monde-du-vtt.component';
import { SnchessComponent } from './projet/snchess/snchess.component';
import { NgOptimizedImage } from "@angular/common";
import { VttHeaderComponent } from './projet/le-monde-du-vtt/vtt-header/vtt-header.component';
import { VttFooterComponent } from './projet/le-monde-du-vtt/vtt-footer/vtt-footer.component';
import { VttHomeComponent } from './projet/le-monde-du-vtt/vtt-home/vtt-home.component';
import { VttContactComponent } from './projet/le-monde-du-vtt/vtt-contact/vtt-contact.component';
import { VttXcComponent } from './projet/le-monde-du-vtt/vtt-xc/vtt-xc.component';
import { VttDhComponent } from './projet/le-monde-du-vtt/vtt-dh/vtt-dh.component';
import { VttTrialComponent } from './projet/le-monde-du-vtt/vtt-trial/vtt-trial.component';
import { TreejsComponent } from './projet/threeJS/treejs.component';

@NgModule({
  declarations: [
    AppComponent,
    InstaRandPostComponent,
    InstaRandFeedComponent,
    InstaRandHeaderComponent,
    InstaRandLoadingComponent,
    InstaRandComponent,
    HomeComponent,
    InstaRandStoriesComponent,
    LeMondeDuVttComponent,
    SnchessComponent,
    VttHeaderComponent,
    VttFooterComponent,
    VttHomeComponent,
    VttContactComponent,
    VttXcComponent,
    VttDhComponent,
    VttTrialComponent,
    TreejsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}

