import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get('/api/housing');
  }
  // send a POST request to the API to create a new data object
  // create(post, token) {
  //   return this.http.post('/api/housing', JSON.stringify(post), this.getHttpOptions());
  // }
}
