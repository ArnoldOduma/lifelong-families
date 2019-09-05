import { OnInit, Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Housing } from 'src/app/shared/housing';
import { SearchService } from 'src/app/services/search.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-businesslist',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./businesslist.component.css']
})
export class BusinesslistComponent implements OnInit {

  SERVER_URL = "https://api-housing-services-business.herokuapp.com/api/v1/business/";

  formData = new FormData();
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  f_addr: string;
  city: string;
  postCode: string;
  private geoCoder;
  isLinear = false;
  formGroup: FormGroup;
  selectedFile = null;

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;


  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
    }
  }

  constructor(private httpClient: HttpClient, private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

  }

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
          // let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // let place: google.maps.places.PlaceResult = autocomplete.getPalce();

          //verify result
          // if (place.geometry === undefined || place.geometry === null) {
          //   return;
          // }
          // //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
    });

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstCtrl: ['', Validators.required],
          secondCtrl: ['', Validators.required],
          thirdCtrl: ['', Validators.required],
          tenthCtrl: ['', Validators.required],
          fourthCtrl: ['', Validators.required],

        }),
        this._formBuilder.group({
          fiveCtrl: ['', Validators.required],
          sevenCtrl: ['', Validators.required],
          eightCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({})
      ])
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
  private onSubmit() {
    var arrayControl = this.formGroup.get('formArray') as FormArray;
    console.log(arrayControl.controls[0]);
    console.log(arrayControl.controls[0].get('firstCtrl').value);

    this.formData.append('name', arrayControl.controls[0].get('firstCtrl').value);
    this.formData.append('description', arrayControl.controls[0].get('secondCtrl').value);
    this.formData.append('contact', arrayControl.controls[0].get('thirdCtrl').value);
    this.formData.append('owner_name', arrayControl.controls[0].get('tenthCtrl').value);
    this.formData.append('id', arrayControl.controls[0].get('fourthCtrl').value);
    this.formData.append('address', arrayControl.controls[1].get('fiveCtrl').value);
    this.formData.append('city', arrayControl.controls[1].get('sevenCtrl').value);
    this.formData.append('location', arrayControl.controls[1].get('eightCtrl').value);

    console.log(this.formData);
    this.httpClient.post(this.SERVER_URL, this.formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }


}

