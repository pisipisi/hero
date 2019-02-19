import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { PickupComponent } from '../components/pickup/pickup';
import { AvailableCarsComponent } from '../components/available-cars/available-cars';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { HeroLoginPage } from '../pages/hero-login/hero-login';
import { HeroRegisterPage } from '../pages/hero-register/hero-register';
import { HeroHomePage } from '../pages/hero-home/hero-home';
import { HeroMapComponent } from '../components/hero-map/hero-map';
import { HeroPickupComponent } from '../components/hero-pickup/hero-pickup';
import { HeroLocationComponent } from '../components/hero-location/hero-location';
import { MapsComponent } from '../components/maps/maps';
import { CarService } from '../providers/car/car';
import { PickupCarComponent } from '../components/pickup-car/pickup-car';
import { SimulateService } from '../providers/simulate/simulate';
import { PickupPubSubService } from '../providers/pickup-pub-sub/pickup-pub-sub';
import { DestinationAddresComponent } from '../components/destination-address/destination-address';
import { RequestNoteComponent } from '../components/request-note/request-note'
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
//import { CallNumber } from '@ionic-native/call-number';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
const config: SocketIoConfig = { url: 'http://192.168.77.114:3000', options: {} };

import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    HeroLoginPage,
    HeroRegisterPage,
    HeroHomePage,
    MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddresComponent,
    RequestNoteComponent,
    HeroMapComponent,
    HeroPickupComponent,
    HeroLocationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    HeroLoginPage,
    HeroRegisterPage,
    HeroHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
   // CallNumber,
    Insomnia,
    NativeStorage,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarService,
    SimulateService,
    PickupPubSubService,
    RestProvider,
    FCM
  ]
})
export class AppModule {}
