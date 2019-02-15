
import { Component, Input, OnChanges } from '@angular/core';
declare var google : any;
/**
/**
 * Generated class for the HeroLocationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hero-location',
  templateUrl: 'hero-location.html'
})
export class HeroLocationComponent implements OnChanges {

  @Input() map;
  @Input() helperLocation;

  private popup;
  private heroLocation;
  constructor() {

  }

  ngOnInit() {
    this.showHeroLocation();
  }

  ngOnChanges() {
    if(this.helperLocation) {
      this.updatePosition(this.helperLocation);
    }
  }

  showHeroLocation() {
    this.hideHeroLocation();
    this.heroLocation = new google.maps.Marker({
      map : this.map,
      position : this.map.getCenter(),
      icon : 'assets/imgs/hero_location.png'
    });

    
    // setTimeout(() => {
    //   this.heroLocation.setAnimation(null)
    // }, 750);

  //  this.showPickupTime();
  }
  

  // rotateMarker() {
  //   var deg = 180
  //   document.querySelector('#markerLayer img').style.transform = 'rotate(' + deg + 'deg)'
  //   console.log('changed')
  //   google.maps.event.clearListeners(map, 'idle');
  // }

  updatePosition(location) {
    this.heroLocation.setPosition(location);
  }

  hideHeroLocation() {
    if(this.heroLocation) {
      this.heroLocation.setMap(null);
    }
  }
  // showPickupTime(){

  //   this.popup = new google.maps.InfoWindow({
  //     content : '<h5>You Are Here</h5>'
  //   });
  //   this.popup.open(this.map, this.heroLocation);

  //   google.maps.event.addListener( this.heroLocation, 'click', () =>{
  //     this.popup.open(this.map, this.heroLocation);
  //   });
  // }
}
