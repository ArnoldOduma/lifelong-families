import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {


  private baseURL = 'https://businessapi.herokuapp.com/api/v1';
  private authURL = `${this.baseURL}/rest-auth`

  //KEY   EP => EndPoint
  private registerUserEP = `${this.authURL}/registration`;
  private confirmEmailEP = `${this.authURL}/registration/verify-email`; 
  private changePasswordEP = `${this.authURL}/password/change`;
  private resetPasswordEP = `${this.authURL}/password/reset`;
  private resetPasswordConfirmEP = `${this.authURL}/password/reset/confirm`;
  private userEP = `${this.authURL}/user`;
  private logInEP = `${this.authURL}/login`; 
  private logOutEP = `${this.authURL}/logout`; 


  private listUsersEP = `${this.baseURL}/users`

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(user: User){
    const url = `${this.registerUserEP}/`;
    return this.http.post(url, user);
  }
}
