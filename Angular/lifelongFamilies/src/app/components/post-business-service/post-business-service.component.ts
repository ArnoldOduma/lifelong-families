import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { BusinessService } from 'src/app/models/business-service.model';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { ViewlistingsService } from 'src/app/services/viewlistings.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { concat } from 'rxjs';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Housing } from 'src/app/models/housing.model';

@Component({
  selector: 'app-post-business-service',
  templateUrl: './post-business-service.component.html',
  styleUrls: ['./post-business-service.component.css']
})
export class PostBusinessServiceComponent implements OnInit {


  categoryType = this.actRoute.snapshot.params['type'];

  geolocationPosition: any;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  patchId: number = +sessionStorage.getItem('patchId');;


  id: number;
  name: string;
  type: number;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  price: number;
  category: string;
  description: string;
  location_g_lat: number;
  location_g_lng: number;
  location: string = 'SRID=4326;POINT (-1.2714842095564176 -1.2714842095564176 )';
  location_description: string;
  country: string;
  county: string;
  city: string;
  town: string;
  rating: number;
  paid: boolean;
  verified: boolean;
  views: number;
  limit: number;
  ownerID: number = 1;
  company: string;
  owner_id_passport: string;
  business_permit_number: string;
  email1: string;
  email2: string;
  phone1: number;
  phone2: number;
  website_address: string;
  user: number = 1;
  date_posted: Date;

  uploadForm: FormGroup;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private viewListingService: ViewlistingsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        // Function you want to call here
        

      }
    });
  }
  ngOnInit() {
    console.log('Session=>'+ this.patchId );
    this.mapsLoader();
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    if (this.categoryType === 'business') {
      this.type = 1;
    }else if(this.categoryType === 'service'){
      this.type = 2;
    }else{
      this.type = 3;
    }
  }


  myFiles: string[] = [];
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public imagePath;
  imgURL: any;
  public message: string;

  error: string;

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;



  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }



  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  upload() {
    let files = this.getFiles();
    console.log('File => ' + files);
    let requests = [];
    let img = 1;
    files.forEach((file) => {
      let formData = new FormData();
      formData.append(`image${img}`, file.rawFile, file.name);
      console.log('form data => ' + img);
      requests.push(this.viewListingService.patchImages(this.type,this.patchId, formData));
      img++;
    });
    concat(...requests).subscribe(
      (res: any) => {
        console.log(res);
        alert('Success');
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    )
  }


  createBusiness_Service() {
    let businessService: BusinessService = {
      id: this.id,
      name: this.name,
      type: this.type,
      image1: this.image1,
      image2: this.image2,
      image3: this.image3,
      image4: this.image4,
      price: this.price,
      category: this.category,
      description: this.description,
      location: this.location,
      location_g_lat: this.location_g_lat,
      location_g_lng: this.location_g_lng,
      location_description: this.location_description,
      country: this.country,
      county: this.county,
      city: this.city,
      town: this.town,
      rating: this.rating,
      paid: this.paid,
      verified: this.verified,
      views: this.views,
      limit: this.limit,
      ownerID: this.ownerID,
      company: this.company,
      owner_id_passport: this.owner_id_passport,
      business_permit_number: this.business_permit_number,
      email1: this.email1,
      email2: this.email2,
      phone1: this.phone1,
      phone2: this.phone2,
      website_address: this.website_address,
      user: this.user,
      date_posted: this.date_posted
    };
    console.log(businessService);
    this.viewListingService.createBusinessService(businessService).subscribe(
      (res: any) => {
        alert("done")
        console.log(res);
        sessionStorage.setItem('patchId', res.id.toString());
        this.patchId = +sessionStorage.getItem('patchId');
      },
      (error) => alert(error)
    );

  }

  createHousing() {
    let housing: Housing = {
      id: this.id,
      name: this.name,
      type: this.type,
      image1: this.image1,
      image2: this.image2,
      image3: this.image3,
      image4: this.image4,
      price: this.price,
      category: this.category,
      description: this.description,
      location: this.location,
      location_g_lat: this.location_g_lat,
      location_g_lng: this.location_g_lng,
      location_description: this.location_description,
      country: this.country,
      county: this.county,
      city: this.city,
      town: this.town,
      rating: this.rating,
      paid: this.paid,
      verified: this.verified,
      views: this.views,
      limit: this.limit,
      ownerID: this.ownerID,
      company: this.company,
      owner_id_passport: this.owner_id_passport,
      business_permit_number: this.business_permit_number,
      email1: this.email1,
      email2: this.email2,
      phone1: this.phone1,
      phone2: this.phone2,
      website_address: this.website_address,
      user: this.user,
      date_posted: this.date_posted
    };
    console.log(housing);
    this.viewListingService.createHousing(housing).subscribe(
      success => alert("House created successfully"),
      error => alert('Error !!!!!! =>'+error)
    );

  }


  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    console.log(this.image1);
  }


  private setCurrentLocation() {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geolocationPosition = position;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.location_g_lat = this.latitude;
        this.location_g_lng = this.longitude;
      });
    }
  }

  private mapsLoader() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("places_changed", () => {
        this.ngZone.run(() => {
          //get place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set lat, long and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

        })
      })
    })
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.location_g_lat = this.latitude;
    this.location_g_lng = this.longitude;
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
        console.log('------------Geocoder failed due to: ' + status);
      }

    });
  }


}
