import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroHomePage } from './hero-home';

@NgModule({
  declarations: [
    HeroHomePage,
  ],
  imports: [
    IonicPageModule.forChild(HeroHomePage),
  ],
})
export class HeroHomePageModule {}
