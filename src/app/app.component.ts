import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { Facebook } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 // rootPage:any = HomePage;
 @ViewChild(Nav) nav: Nav;
  rootPage:any = MainPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage:NativeStorage, private fb: Facebook,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      
      statusBar.styleDefault();
      splashScreen.hide();
    });



    // this.insomnia.allowSleepAgain()
    //   .then(
    //     () => console.log('success'),
    //     () => console.log('error')
    //   );
  }
  logout() {
    this.nativeStorage.setItem('helper', null).then(() => {
      console.log("hello");
      
      this.fb.logout()
      .then( res => console.log(res))
      .catch(e => console.log('Error logout from Facebook', e));
      this.nav.setRoot(MainPage);
      // this.fb.getLoginStatus().then( data=>{
      //   if (data.status =='connected'){
      //     this.fb.logout()
      //   }
      // }
    // );
     });
  }
}

