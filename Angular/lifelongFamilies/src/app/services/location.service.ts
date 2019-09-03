import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public static getCurrentLocation(){
    if(!navigator.geolocation){
      console.log('geolocation not supported');
      return;
    }

    function resolve(position){
      return position;
    }
    function reject() {
      console.log('unable to retrieve location');
    }

    // tslint:disable-next-line: only-arrow-functions
    return new Promise( function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  }

  constructor() { }
}
