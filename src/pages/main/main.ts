import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HeroLoginPage } from '../hero-login/hero-login';
import { HeroHomePage } from '../hero-home/hero-home';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  //  if (!(this.platform.is('mobileweb') || this.platform.is('core'))) {
      this.nativeStorage.getItem('helper').then((data) => {
        if (data !== null && data.token) {
          this.navCtrl.setRoot(HeroHomePage);
        }
      });
      // if(localStorage.getItem("helper")) {
      //   let helper = JSON.parse(localStorage.getItem("helper"));
      //   console.log(helper);
      // }
  //  }
  }

  heroClick() {
    this.navCtrl.setRoot(HeroLoginPage);
  }

  helpClick() {
    this.navCtrl.push(HomePage)
  }
}
