import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroRegisterPage } from './hero-register';

@NgModule({
  declarations: [
    HeroRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroRegisterPage),
  ],
})
export class HeroRegisterPageModule {}
