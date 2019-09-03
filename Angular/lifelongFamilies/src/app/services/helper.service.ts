import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public static async getYelpSiteData(http: HttpClient, option): Promise<any[]>{
    const deviceLocation = await LocationService.getCurrentLocation();


    var latitudeValue = deviceLocation['coords'].latitude;
    var longitudeValue = deviceLocation['coords'].longitude;

    const urlPrefix = "https://nodejs-demo-server.herokuapp.com/yelp/";
    const urlSuffix  = "/latitude/"+latitudeValue+"/longitude/"+longitudeValue;

    var url = urlPrefix + option + urlSuffix;

    const data = await http.get(url).toPromise();
    
    console.log(data['businesses']);
    return data['businesses'];
  }
  constructor() { }
}
