import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get('/api/services');
  }
  // send a POST request to the API to create a new data object
  // create(post, token) {
  //   return this.http.post('/api/services', JSON.stringify(post), this.getHttpOptions());
  // }
}
