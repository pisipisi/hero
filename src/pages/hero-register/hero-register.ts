import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HeroLoginPage } from '../hero-login/hero-login';
/**
 * Generated class for the HeroRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hero-register',
  templateUrl: 'hero-register.html',
})
export class HeroRegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeroRegisterPage');
  }
  
  register() {

  }

  // go to login page
  login() {
    this.navCtrl.setRoot(HeroLoginPage);
  }
}
