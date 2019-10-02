import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from 'src/app/models/business-service.model';
import { ViewlistingsService } from 'src/app/services/viewlistings.service';
import { database } from 'firebase';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css']
})
export class ViewListingComponent implements OnInit {


  id = (this.actRoute.snapshot.params['id']*100)/23;
  business: any;
  displayOrNot: boolean = true;

  title: string = 'Angular maps';
  lat: number;
  lng: number;
  geolocationPosition: any;
  latitude: number ;
  longitude: number ;
  zoom: number = 16 ;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private router: Router,
    private viewListingService: ViewlistingsService
  ) { }


  ngOnInit() {
    this.business = this.getBusinessService();
    this.getBusinessService();
  }

  getBusinessService(){
    return this.viewListingService.getSingleListing(this.id).subscribe(
      (data: BusinessService) => {
        this.business = data;
        if (this.business) {
          this.displayOrNot = false;
        } else {
          this.displayOrNot = true;
        }
      },
      (error: any) => console.log(error),
      () => {
        this.latitude = +this.business.location_g_lat.toString();
        this.longitude = +this.business.location_g_lng.toString();
    }
    );
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        console.log('------------Geocoder failed due to: ' + status);
      }
 
    });
  }

}
