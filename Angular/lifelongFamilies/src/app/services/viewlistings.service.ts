import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessServiceAdapter, BusinessService } from '../models/business-service.model';
import { map, retry } from 'rxjs/operators';
import { Housing } from '../models/housing.model';

@Injectable({
  providedIn: 'root'
})

export class ViewlistingsService {



  private baseUrl = 'https://businessapi.herokuapp.com/api/v1';
  private businessEndpoint = `${this.baseUrl}/business`;
  private housingEndpoint = `${this.baseUrl}/housing`;

  constructor(
    private http: HttpClient,
    private adapter: BusinessServiceAdapter
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpFileOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data'
    })
  }

  consAll: any;


  list(type): Observable<BusinessService[]> {
    const url = `${this.businessEndpoint}/?limit=20&type=${type}`;
    return this.http
      .get(url).pipe(
        map((data: any) => data.results.map(item => this.adapter.adapt(item)))
      );
  }

  listHousing(type): Observable<Housing[]> {
    const url = `${this.housingEndpoint}/?limit=20$type=${type}`;
    return this.http
      .get(url).pipe(
        map((data: any) => data.results.map(item => this.adapter.adapt(item)))
      );
  }

  getSingleListing(id): Observable<BusinessService> {
    const url = `${this.businessEndpoint}/${id}`;
    return this.http.get<BusinessService>(url);
  };

  getSingleHouseListing(id): Observable<Housing> {
    const url = `${this.housingEndpoint}/${id}`;
    return this.http.get<Housing>(url);
  }

  createBusinessService(businessService: BusinessService) {
    const url = `${this.businessEndpoint}/`;
    return this.http.post(url, businessService);
  }

  createHousing(housing: Housing) {
    const url = `${this.housingEndpoint}/`;
    return this.http.post(url, housing);
  }

  patchImages(type, id, formData) {
    if (type === 1 || type === 2) {
      const url = `${this.businessEndpoint}/${id}/`;
      return this.http.patch(url, formData)
        .pipe(
          retry(1),
        );
    } else {
      const url = `${this.housingEndpoint}/${id}/`;
      return this.http.patch(url, formData)
        .pipe(
          retry(1),
        );
    }
  }


  search(name,county, minPrice, maxPrice, category) {
    const url = `${this.businessEndpoint}/?name__icontains=${name}&limit=20&min_price=&max_price=&county=${county}&category=${category}`
    return this.http
      .get(url).pipe(
        map((data: any) => data.results.map(item => this.adapter.adapt(item)))
      );
  } 

}
