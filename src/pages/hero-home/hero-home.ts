import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
//import { CallNumber } from '@ionic-native/call-number';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { RestProvider } from '../../providers/rest/rest';
@IonicPage()
@Component({
  selector: 'page-hero-home',
  templateUrl: 'hero-home.html',
})
export class HeroHomePage {
  public helpeeLocation;
  public isPickupRequested;
  private helperRoom;
  private helpeeNumber;
  constructor(private fcm: FCM, 
    public alertCtrl: AlertController, 
    private insomnia: Insomnia, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private socket: Socket,
    public restProvider: RestProvider
   // private callNumber: CallNumber
    ) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad HeroHomePage');
    this.getMessages().subscribe(message => {
      this.getHelp(message);
    });

    this.getCancelHelp().subscribe(message => {
      console.log(message)
      this.isPickupRequested = false;
      this.socket.emit('helper-leave', this.helperRoom);
    });

    this.fcm.subscribeToTopic('all');
    this.fcm.getToken().then(token=>{
        console.log(token);
        this.restProvider.updateFCMToken(token).then((result) => {
          console.log(result);
        });
      });
      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })
      this.fcm.onTokenRefresh().subscribe(token=>{
        console.log(token);
      });
      //end notifications.
      // this.insomnia.keepAwake()
      //   .then(
      //     () => console.log('success'),
      //     () => console.log('error')
      //   );

  }
  getCancelHelp() {
    let observable = new Observable(observer => {
      this.socket.on('help-canceled', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('help-send', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getHelp(message) {
    let alert = this.alertCtrl.create();
    console.log(message);
    this.helpeeLocation = message.location;
    this.helperRoom = message.room;
    this.helpeeNumber = message.phone;
    alert.setTitle('Some one need help');
    alert.setMessage("Note:"+message.note +"<br>Phone:"+message.phone+"<br />Distance:"+Math.round(message.distance * 100) / 100 +" miles")
    alert.addButton({
      text: 'Close',
      handler: () => {
        console.log("close");
      }
    });
    alert.addButton({
      text: 'Accept',
      handler: accept => {
        // sent accept to server 
        this.isPickupRequested = true;
        this.socket.emit('helper-join', message.room);
        console.log(accept);
      }
    });
    alert.present();
  }

  callHelpee() {
  //   this.callNumber.callNumber(this.helpeeNumber, true)
  // .then(res => console.log('Launched dialer!', res))
  // .catch(err => console.log('Error launching dialer', err));
  }

}
