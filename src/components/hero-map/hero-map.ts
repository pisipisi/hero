import { Component, Input } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { NativeStorage } from '@ionic-native/native-storage';
//import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
declare var google : any;

@Component({
  selector: 'hero-map',
  templateUrl: 'hero-map.html'
})
export class HeroMapComponent {
  @Input() destination;
  @Input() isPickupRequested : boolean;
  public map;
  public isMapIdle : boolean;
  public currentLocation;
  constructor(public geolocation : Geolocation, public loadingCtrl : LoadingController, private socket: Socket, private nativeStorage:NativeStorage) {
    console.log('Hello HeroMapComponent Component');
  }
  ngOnInit(){
    this.map =this.createMap();
    this.addMapEventListeners();
    //let helper = this.nativeStorage.getItem('helper');
    this.getCurrentLocation().subscribe(location => {
      this.nativeStorage.getItem('helper').then(data => {
        if(data !== null) {
          console.log(data);
          this.socket.emit('helper-open-map', {location:location, id: data.user});
          this.map.setCenter(location);
        }
      });
      
    });
  }
  ngOnChanges() {
    if(this.isPickupRequested){
      this.startNavigating();
    } 
  }
  addMapEventListeners(){
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })
  }

  createMap(location = new google.maps.LatLng(40.712784,-74.005942)){
    console.log('init location ' + location)
    let mapOptions = {
      center: location,
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true
    }
    let mapEl = document.getElementById("map");
    let map = new google.maps.Map(mapEl,mapOptions);
    return map;
  }

  getCurrentLocation() {

    let loading = this.loadingCtrl.create({
      content:'Locating...'
    });

    loading.present();

    let options = {timeout : 10000 , enableHighAccuracy:true};
    let locationObs = new Observable(observable => {
      this.geolocation.getCurrentPosition(options)
      .then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        console.log('lat '+ lat +' == '+ 'long '+lng )
        let location = new google.maps.LatLng(lat, lng);
        console.log('current location '+location)
        observable.next(location);

        loading.dismiss();
      // },
      // (err) => {
      //   console.log('Geolocation err: '+ err);
      //   loading.dismiss();
      // })
      })
    })
    return locationObs;
  }
  listExpand() {
    let x = document.getElementById("directionsPanel");
    console.log("herer");
    if(x.style.display == 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
  startNavigating() {
    let directionsService =  new google.maps.DirectionsService();
    let directionDisplay = new google.maps.DirectionsRenderer();
    directionDisplay.setMap(this.map);
    directionDisplay.setPanel(document.getElementById("directionsPanel"));
    this.getCurrentLocation().subscribe(currentLocation => {

      directionsService.route({
        origin: currentLocation,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING
      
      }, (res, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
          directionDisplay.setDirections(res);
        } else {
          console.warn(status);
        }
      });
    })
    
  }

  centerLocation(location){
    if(location){
      this.map.setCenter(location);
    }
    else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.setCenter(currentLocation);
      })
    }
  }
}
