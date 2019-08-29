import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore';

// import { NotifyService } from './notify.service';


// import { switchMap,of } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import {FirebaseApp, FirebaseAppConfig, FirebaseAuth, FirebaseDatabase} from '@angular/fire';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {isFirebaseRef} from '@angular/fire/database/utils';
import {database} from 'firebase';
import {DatabaseReference} from '@angular/fire/database/interfaces';
import Database = firebase.database.Database;
import {HttpClient, HttpClientJsonpModule, HttpHeaders, JsonpClientBackend} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {headersToString} from "selenium-webdriver/http";
// custom user interface
interface User {
  // uid: string;
  email: string;
  theusername: string;
  theregion: string;
}
interface Business {
  // uid: string;
  email: string;
  theusername: string;
  theregion: string;
}
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  user: Observable<any>;
  userData:any;
  private prox:string="http://localhost:4200/login/";
private endpoint: string="https://api-housing-services-business.herokuapp.com/api/v1/business/";

  // Access-Control-Allow-Origin:https://www.giantbomb.com/api/games/?format=xml&api_key=a1a68669be4a0ea543f5f4ef7f971020896559d3
  private fr: FirebaseAuth;
  private frs: FirebaseApp;
  private frcon: FirebaseAppConfig;
  private frdb: FirebaseDatabase;

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private ref : AngularFireDatabase,
              private http: HttpClient,
              private jsonp: HttpClientJsonpModule,
              private jsonpt: JsonpClientBackend
              ) {

    // Define the user observable
    // this.user = this.afAuth.authState
    //   .switchMap(user => {
    //     if (user) {
    //
    //       // logged in, get custom user from Firestoree
    //
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       // logged out, null
    //
    //       return Observable.of(null);
    //     }
    //   });
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     // go to home page
    //     this.router.navigate(['/']);
    //   } else {
    //     // go to login page
    //     this.router.navigate(['/signup']);
    //   }
    // });
    this.isAuthenticated();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        console.log("Good to go!!!");
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        console.log("Access denied,not logged in");

      }
    })
  }
  private extractData(res: Response) {
    let body = res;
    return body;
  }
  getProducts(): Observable<any> {
    return  this.http.jsonp(this.endpoint,"callback").pipe(map((response: Response) => response.json()));
   // return  this.http.get(this.endpoint)
   //    .subscribe((data: Business) => {
   //      // Data extraction from the HTTP response is already done
   //      // Display the result
   //      console.log('TJ user data', data);
   //    });

  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }
  // Update properties on the user document
  // updateUser(user: User, data: any) {
  //   return this.afs.doc(`users/${user.uid}`).update(data);
  // }
  //// Email/Password Auth ////

  emailSignUp(email: string, password: string, theusername: string , theregion: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {


        // firebase.database().ref(`users/${user.user.uid}`).push({
        //   'username':theusername,
        //   'region':theregion
        // });
this.http.get("")
      })
      .catch(error => this.handleError(error) );
  }
  // If error, console log and notify user
  private handleError(error) {
    console.error(error);

  }
  isAuthenticated() {
    // this.user = this.afAuth.authState;
    if (this.afAuth.authState) {
      // this.router.navigateByUrl('/home');
      return true;
    } else {
      // this.router.navigateByUrl('/login');
      return false;
    }
  }


  // Sets user data to firestore after succesful login
  private setUserDoc(user) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      // uid: user.uid,
      email: user.email || null,
      theusername: user.username,
      theregion: user.theregion
    };

    return userRef.set(data);

  }
  signup(email: string, password: any){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error =>
      console.log(error)
    );

  }

  currentuser(){
    return firebase.auth().currentUser;
  }
  authState(){
    return this.afAuth.authState;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }


}
