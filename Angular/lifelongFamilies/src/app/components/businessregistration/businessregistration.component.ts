import { Component, OnInit , ViewChild, ElementRef, NgZone } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-businessregistration',
  templateUrl: './businessregistration.component.html',
  styleUrls: ['./businessregistration.component.css']
})
export class BusinessregistrationComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  f_addr:string;
  city: string;
  postCode: string;
  private geoCoder;

  isLinear = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;

  selectedFile = null;

  onFileSelected(event){
    this.selectedFile = event.target.files[0];

  }

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

      this.formGroup1 = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required],
        thirdCtrl: ['', Validators.required],
        fourCtrl: ['', Validators.required],
      });
      this.formGroup2 = this._formBuilder.group({
        fiveCtrl: ['', Validators.required],
        sixCtrl: ['', Validators.required],
        sevenCtrl: ['', Validators.required],
        eightCtrl: ['', Validators.required],
      });
      this.formGroup3 = this._formBuilder.group({
        nineCtrl: ['', Validators.required],
        tenCtrl: ['', Validators.required],
      });

  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
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
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
