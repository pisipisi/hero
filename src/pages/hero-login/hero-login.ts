import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { HeroRegisterPage } from '../hero-register/hero-register';
import { Facebook, FacebookLoginResponse  } from '@ionic-native/facebook';
import { RestProvider } from '../../providers/rest/rest';
import { HeroHomePage } from '../hero-home/hero-home';
import { NativeStorage } from '@ionic-native/native-storage';


/**
 * Generated class for the HeroLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hero-login',
  templateUrl: 'hero-login.html',
})
export class HeroLoginPage {
  isLoggedIn:boolean = false;
  user: any = {}
  constructor(
    private fb: Facebook, 
    public restProvider: RestProvider, 
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public forgotCtrl: AlertController, 
    public navParams: NavParams, 
    private nativeStorage: NativeStorage,
		public loadingController: LoadingController,
    public menu: MenuController) {

    this.menu.swipeEnable(false);
    fb.getLoginStatus()
    .then((res: FacebookLoginResponse) => {
      console.log(res.status);
      if(res.status === "connected") {
        this.isLoggedIn = true;
        navCtrl.setRoot(HeroHomePage);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeroLoginPage');
  }
 // go to register page
  register() {
    this.navCtrl.setRoot(HeroRegisterPage);
  }

  // login and go to home page
  login() {
    this.restProvider.login(this.user.email, this.user.password).then((result) => {
      console.log(result);
      this.nativeStorage.setItem('helper', result).then(() => {
        this.navCtrl.setRoot(HeroHomePage);
      });
    }, (err) => {
      console.log(err);
      let alert = this.forgotCtrl.create({
        title: 'Error',
        message: err.error.message,
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present();
    });
  }
  async fbLogin() {
    const loading = await this.loadingController.create({
			content: 'Please wait...'
		});
    loading.present();
  

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse)  => {
      // let userId = res.authResponse.userID;

			// //Getting name and gender properties
			// this.fb.api("/me?fields=name,email", ['public_profile', 'user_friends', 'email'])
			// .then(user =>{
			// 	user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
			// 	//now we have the users info, let's save it in the NativeStorage
			// 	this.nativeStorage.setItem('facebook_user',
			// 	{
			// 		name: user.name,
			// 		email: user.email,
			// 		picture: user.picture
			// 	})
			// 	.then(() =>{
				
			// 		loading.dismiss();
			// 	}, error =>{
			// 		console.log(error);
			// 		loading.dismiss();
			// 	})
			// });
      if(res.status === "connected") {
        this.isLoggedIn = true;
        console.log(res);
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
      loading.dismiss();
    })
    .catch(e => {
      console.log('Error logging into Facebook', e);
      loading.dismiss();
    });
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.user = res;
        this.restProvider.fbLogin(res).then(result => {
          console.log(result);

          this.nativeStorage.setItem('helper', result).then(() => {
            this.navCtrl.setRoot(HeroHomePage);
          });
         
        }, error => {
          console.log(error);
          let alert = this.forgotCtrl.create({
            title: 'Error',
            message: error.error.message,
            buttons: [
              {
                text: 'Ok'
              }
            ]
          });
          alert.present();
        })
        
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sent successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
