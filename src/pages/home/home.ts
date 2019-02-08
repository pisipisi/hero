import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
//import { MapsComponent } from '../../components/maps/maps';
import { PickupPubSubService } from '../../providers/pickup-pub-sub/pickup-pub-sub';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public isPickupRequested;
  public pickupSubscription;
  public timeTillArrival;
  public isRiderPickedUp;
  public destination;
  
  constructor(public alertCtrl: AlertController, private socket: Socket,
              private pickupPubSubService : PickupPubSubService) {
    this.isPickupRequested = false;
    this.isRiderPickedUp = false;
    this.timeTillArrival = 5;
    this.pickupSubscription =  this.pickupPubSubService.watch().subscribe(e=>{
      this.processPickupSubscription(e);
    });
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        console.log('left', user)
      } else {
        console.log('join', user)
      }
    });
  }

  processPickupSubscription(e){
    switch(e.event){
      case this.pickupPubSubService.EVENTS.ARRIVAL_TIME:
        this.updateArrivaTime(e.data);
        break;
      case this.pickupPubSubService.EVENTS.PICKUP:
        this.riderPickedUp()
        break;
      case this.pickupPubSubService.EVENTS.DROPOFF:
        this.riderDroppedOff();
        break;
    }
  }

  setDestination(destination){
    this.destination = destination
  }

  riderPickedUp(){
    this.isRiderPickedUp =true;
    console.log("pickup");
  }

  rateDriver(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Rate Driver');

    alert.addInput({
      type: 'radio',
      label: 'Perfect',
      value: 'perfect',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Okay',
      value: 'okay'
    });

    alert.addInput({
      type: 'radio',
      label: 'Horrible',
      value: 'horrible'
    });

    alert.addButton({
      text: 'Submit',
      handler: rating => {
        // TODO: send rating to server
        console.log(rating);
      }
    });
    alert.present();
  }

  riderDroppedOff(){
    this.rateDriver();
    this.isRiderPickedUp = false;
    this.isPickupRequested = false;
    this.destination = null;
    this.timeTillArrival = 5;
  }

  updateArrivaTime(seconds){
    let minutes = Math.floor(seconds/60);
    this.timeTillArrival = minutes;
  }

  confirmPickup(){
  //  this.socket.connect();

    console.log("pickup request");
    this.isPickupRequested = true;
  }

  cancelPickup(){

    this.isPickupRequested = false;
    this.socket.emit('cancel-help', true);
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
