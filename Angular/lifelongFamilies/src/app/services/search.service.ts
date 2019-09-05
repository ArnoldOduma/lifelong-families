import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, forkJoin } from 'rxjs';
import { Housing } from '../shared/housing';
import { Business, IBusinessResponse } from '../shared/business';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
  clientID = '';
  baseURL = 'https://api-housing-services-business.herokuapp.com/api/v1/';
  housingURL = 'housing/';
  businessURL = 'business/';
  servicesURL = 'services/';
  // baseURL = 'http://localhost:3000/';
  constructor(private _http: HttpClient) {
    console.log('Ready');
  }

  // getHousing(): Observable<Housing> {
  //   return this._http.get<Housing>(this.baseURL + this.housingURL)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   );
  // }
  // getHouse(city): Observable<Business> {
  //   return this._http.get<Business>(this.baseURL + this.housingURL + '?city=' + city)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }
  // getBusinesses(): Observable<Business> {
  //   return this._http.get<Business>(this.baseURL + this.businessURL)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  // getBusiness(city): Observable<Business> {
  //   return this._http.get<Business>(this.baseURL + this.businessURL + '?city=' + city)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  public getAllSources(): Observable<any[]>{
    let response1 = this._http.get(this.baseURL + this.businessURL );
    let response2 = this._http.get(this.baseURL + this.housingURL);
    let response3 = this._http.get(this.baseURL + this.servicesURL);
    return forkJoin([response1,response2, response3])
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public searchFromMultipleSources(id, category, city): Observable<any[]> {
    let response1 = this._http.get(this.baseURL + this.businessURL + '?id=' + id + '&category=' + category + '&city=' + city );
    let response2 = this._http.get(this.baseURL + this.housingURL + '?id=' + id + '&category=' + category + '&city=' + city );
    let response3 = this._http.get(this.baseURL + this.servicesURL + '?id=' + id + '&category=' + category + '&city=' + city );
    return forkJoin([response1, response2, response3])
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // createHouse(house: Housing) {
  //   return this._http.post(this.baseURL + this.housingURL, house);
  // }


  // search(filter: {name: string} = {name: ''}, page = 1): Observable<IBusinessResponse> {
  //   return this._http.get<IBusinessResponse>(this.baseURL2 + 'business/')
  //   .pipe(
  //     tap((response: IBusinessResponse) => {
  //       response.results = response.results
  //       .map(business => new Business(business.id, business.name))
  //       .filter(business => Business.name.includes(filter.name));
  //       return response;
  //     })
  //   );
  // }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage:${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
// 'T9i-gFZXxBL7KIaI0mAMU8cutDUCDmnYhb_OMllFRMDvWg-HH5_5reIc7EY264Dmh7hhO3qvKCl_wTtRDpoAxUvv0Ou4tDEmiUgvSvehQOtLNHMqit2r1RQgFnYwXXYx'
