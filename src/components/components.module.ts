import { NgModule } from '@angular/core';
import { MapsComponent } from './maps/maps';
import { PickupComponent } from './pickup/pickup';
import { AvailableCarsComponent } from './available-cars/available-cars';;
import { DestinationAddresComponent } from './destination-address/destination-address';
import { PickupCarComponent } from './pickup-car/pickup-car';
import { RequestNoteComponent } from './request-note/request-note';
import { HeroMapComponent } from './hero-map/hero-map';
import { HeroPickupComponent } from './hero-pickup/hero-pickup';
import { HeroLocationComponent } from './hero-location/hero-location';
@NgModule({
	declarations: [MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddresComponent,
    RequestNoteComponent,
    HeroMapComponent,
    HeroPickupComponent,
    HeroLocationComponent,
    HeroLocationComponent
],
	imports: [],
	exports: [MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddresComponent,
    RequestNoteComponent,
    HeroMapComponent,
    HeroPickupComponent,
    HeroLocationComponent,
    HeroLocationComponent]
})
export class ComponentsModule {}
