import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { CallNumber } from '@ionic-native/call-number';
import { Insomnia } from '@ionic-native/insomnia/ngx';


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
  constructor(public alertCtrl: AlertController, private insomnia: Insomnia, public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private callNumber: CallNumber) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad HeroHomePage');
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
    this.getMessages().subscribe(message => {
      this.getHelp(message);
    });

    this.getCancelHelp().subscribe(message => {
      console.log(message)
      this.isPickupRequested = false;
      this.socket.emit('helper-leave', this.helperRoom);
    });


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
    this.callNumber.callNumber(this.helpeeNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
