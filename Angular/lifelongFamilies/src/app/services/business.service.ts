import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) {
    
   }
  list() {
    return this.http.get('/api/business');
  }
  // send a POST request to the API to create a new data object
  // create(post, token) {
  //   return this.http.post('/api/business', JSON.stringify(post), this.getHttpOptions());
  // }
}
