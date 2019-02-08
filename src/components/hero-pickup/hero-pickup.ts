import { Component, Input, OnChanges } from '@angular/core';
declare var google : any;
/**
 * Generated class for the HeroPickupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hero-pickup',
  templateUrl: 'hero-pickup.html'
})
export class HeroPickupComponent implements OnChanges {

  @Input() map;
  @Input() isPickupRequested:boolean;
  @Input() helpeeLocation;

  private pickupMarker;
  private popup;
  constructor() {
    console.log('Hello HeroPickupComponent Component');

  }

  ngOnChanges() {
    if(this.isPickupRequested){
        this.showPickupMarker();
      }
      else{
        this.hidePickupMarker();
      }
  }



  showPickupMarker(){
    this.hidePickupMarker();
    this.pickupMarker =  new google.maps.Marker({
      map : this.map,
      animation : google.maps.Animation.BOUNCE,
      position : this.helpeeLocation,
      icon : 'assets/imgs/pin.png'
    })

    setTimeout(() => {
      this.pickupMarker.setAnimation(null)
    }, 750);

    this.showPickupTime();

    //send pickup location
   // this.updatedPickupLocation.next(this.pickupMarker.getPosition());
  }

  hidePickupMarker(){
    if(this.pickupMarker){
      this.pickupMarker.setMap(null);
    }
  }

  showPickupTime(){
    this.popup = new google.maps.InfoWindow({
      content : '<h5>Helpee is here!</h5>'
    });
    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () =>{
      this.popup.open(this.map, this.pickupMarker);
    });
  }

  updateTime(seconds){
    let minutes = Math.floor(seconds/60);
    this.popup.setContent(`<h5>${minutes} minutes</h5>`);
  }
}
