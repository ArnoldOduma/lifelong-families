import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-housingregistration',
  templateUrl: './housingregistration.component.html',
  styleUrls: ['./housingregistration.component.css']
})
export class HousingregistrationComponent implements OnInit {
  SERVER_URL = "https://api-housing-services-business.herokuapp.com/api/v1/housing/";



  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  f_addr:string;
  city: string;
  postCode: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  isLinear = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;

  listings= [
    {value: 'rent-0', viewValue: 'Rent'},
    {value: 'sale-1', viewValue: 'Sale'},

  ];

  categories= [
    {value: 'flats-0', viewValue: 'Flats and Apartments'},
    {value: 'studios-1', viewValue: 'Studios'},
    {value: 'houses-1', viewValue: 'Houses'},
    {value: 'townhouses-1', viewValue: 'TownHouses'},
    {value: 'bungalows-1', viewValue: 'Bungalows'},
    {value: 'hostels-1', viewValue: 'Hostels'},
    {value: 'rooms-1', viewValue: 'Rooms'},
    {value: 'bedsitters-1', viewValue: 'Bedsitters'},

  ];
  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url


    }
  }

  constructor(private httpClient: HttpClient, private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.formGroup2 = this._formBuilder.group({
      name: [''],
      description: [''],
      city: ['']
    });

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
      });
      this.formGroup2 = this._formBuilder.group({
        thirdCtrl: ['', Validators.required],
        fourthCtrl: ['', Validators.required],
        fifthCtrl: ['', Validators.required],
        sixCtrl: ['', Validators.required],
        sevenCtrl: ['', Validators.required],
        eightCtrl: ['', Validators.required],
        nineCtrl: ['', Validators.required],
      });
      this.formGroup3 = this._formBuilder.group({
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
  onSubmit() {
    const formData = new FormData();
    formData.append('text', this.formGroup2.get('name').value);
    formData.append('text', this.formGroup2.get('description').value);
    formData.append('text', this.formGroup2.get('city').value);
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
