import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ServicesService} from './services/firebase.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: ServicesService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentuser();
    if (currentUser) {
      // logged in so return true
      this.router.navigateByUrl('/home');
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/login');
    return false;
  }
}
