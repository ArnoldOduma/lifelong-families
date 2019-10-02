import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
  handleError(error: HttpErrorResponse){
    console.log("lalala");
    console.log(error.type);
    return throwError(error);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(req)
    .pipe(
      catchError(this.handleError)
    )
  }
}
