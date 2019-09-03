import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Business } from './business';
import { retry, catchError } from 'rxjs/operators';
import { Housing } from './housing';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getBusinesses(): Observable<Business> {
    return this.http.get<Business>(this.apiURL + '/businesses')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getBusiness(id): Observable<Business> {
    return this.http.get<Business>(this.apiURL + '/businesses/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getHousing(): Observable<Housing> {
    return this.http.get<Housing>(this.apiURL + '/housing')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getHouse(id): Observable<Housing> {
    return this.http.get<Housing>(this.apiURL + '/housing/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

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
