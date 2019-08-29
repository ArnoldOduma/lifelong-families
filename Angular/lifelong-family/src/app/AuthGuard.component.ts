import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ServicesService} from './services/firebase.service';
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {loggedIn} from "@angular/fire/auth-guard";



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  userData: any;

  constructor(
    private router: Router,
    private authenticationService: ServicesService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this.authenticationService.currentuser();
    if(this.authenticationService.isLoggedIn !== true) {
      window.alert('Access Denied, Login is Required to Access This Page!')
      this.router.navigate(['sign-in'])
    }
    return true;
    }


    // // not logged in so redirect to login page with the return url
    // localStorage.setItem('user', null);
    // JSON.parse(localStorage.getItem('user'));
    // this.router.navigateByUrl('/login');
    // this.router.navigateByUrl('/login');
    // return false;
    //  return this.authenticationService.authState().subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //     this.router.navigateByUrl('/home');
    //     return true;
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //     this.router.navigateByUrl('/login');
    //     return false;
    //   }
    // })




  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null) ? true : false;
  // }
}
