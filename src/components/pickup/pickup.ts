import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { PickupPubSubService } from '../../providers/pickup-pub-sub/pickup-pub-sub';
declare var google : any;
/**
 * Generated class for the PickupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent implements OnInit, OnChanges {
  @Input() isPinSet :boolean ;
  @Input() map;
  @Input() isPickupRequested:boolean;
  @Input() currentNote;
  @Input() destination;
  @Output() updatedPickupLocation : EventEmitter<any> = new EventEmitter();

  private pickupMarker;
  private popup;
  private pickupSubscription;

  constructor(private pickupPubSubService : PickupPubSubService) {
  }
  ngOnInit(){
    this.pickupSubscription = this.pickupPubSubService.watch().subscribe(e=>{
      if(e.event === this.pickupPubSubService.EVENTS.ARRIVAL_TIME){
        this.updateTime(e.data);
      }
    });
  }

  ngOnChanges(){
    
    //do not allow pickup pin/location
    //to change if pickup is requested

    if(!this.isPickupRequested){
      if(this.isPinSet){
        this.showPickupMarker();
      }
      else{
        this.hidePickupMarker();
      }
    } else {
      this.popup.setContent(`<h5>Waiting for response</h5>`);
    }

    if(this.destination){

      this.hidePickupMarker();
    }

  }

  showPickupMarker(){
    this.hidePickupMarker();

    this.pickupMarker =  new google.maps.Marker({
      map : this.map,
      animation : google.maps.Animation.BOUNCE,
      position : this.map.getCenter(),
      icon : 'assets/imgs/pin.png'
    })

    setTimeout(() => {
      this.pickupMarker.setAnimation(null)
    }, 750);

    this.showPickupTime();

    //send pickup location
    this.updatedPickupLocation.next(this.pickupMarker.getPosition());
  }

  hidePickupMarker(){
    if(this.pickupMarker){
      this.pickupMarker.setMap(null);
    }
  }

  showPickupTime(){
    console.log(this.isPickupRequested);
    this.popup = new google.maps.InfoWindow({
      content : '<h5>You Are Here</h5>'
    });
    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () =>{
      this.popup.open(this.map, this.pickupMarker);
    });
  }

  updateTime(seconds){
    let minutes = Math.floor(seconds/60);
    if(this.currentNote) {
      this.popup.setContent(`<h5>${minutes} minutes</h5><b>Note: ${this.currentNote.note}</b><br /><b>Phone: ${this.currentNote.phone}</b>`);
    } else {
      this.popup.setContent(`<h5>${minutes} minutes</h5>`);
    }
    
  }
}
