import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { SimulateService } from '../simulate/simulate';
 import { Socket } from 'ng-socket-io';

@Injectable()
export class CarService {

  constructor(public simulateService : SimulateService, private socket: Socket) {
    console.log('Hello CarProvider Provider');
  }

  pollForRiderPickup(){
    return this.simulateService.riderPickUp();
  }

  pollForRiderDropOff(){
    return this.simulateService.riderDropprdOff();
  }

  dropoffCar(pickupLocation, dropoffLocation){
    return this.simulateService.dropoffPickupCar(pickupLocation, dropoffLocation)
  }

  getPickupCar(){

    return this.simulateService.getPickupCar();
  }

  getCars(lat, lng){
    return Observable
    .interval(2000)
    .switchMap(() =>  this.simulateService.getCars(lat, lng))
    .share();
  }

  findPickupCar(pickupLocation, heroLocation){
    return this.simulateService.findPickupCar(pickupLocation, heroLocation);
  }

  getHeroLocation() {
    let observable = new Observable(observer => {
      this.socket.on('helper-current-location', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
