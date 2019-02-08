import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroLoginPage } from './hero-login';

@NgModule({
  declarations: [
    HeroLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroLoginPage),
  ],
})
export class HeroLoginPageModule {}
