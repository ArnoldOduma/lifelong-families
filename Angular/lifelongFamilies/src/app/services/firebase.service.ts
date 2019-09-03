import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

// import { NotifyService } from './notify.service';


// import { switchMap,of } from 'rxjs/operators';
// import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';
import { FirebaseApp, FirebaseAppConfig, FirebaseAuth, FirebaseDatabase } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { isFirebaseRef } from '@angular/fire/database/utils';
import { database } from 'firebase';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import Database = firebase.database.Database;
// custom user interface
interface User {
  // uid: string;
  email: string;
  theusername: string;
  theregion: string;
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: Observable<User>;
  // var ref = new Firebase('https://<YOUR-FIREBASE-APP>.firebaseio.com');

  private fr: FirebaseAuth;
  private frs: FirebaseApp;
  private frcon: FirebaseAppConfig;
  private frdb: FirebaseDatabase;

  // var firebase = require(‘firebase’);
  //
  // const list = this.afAuth.database.list(`users/${uid}/collections`);
  // const list = this.afs.database.list(`users/${uid}/collections`);

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ref: AngularFireDatabase,



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
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }
  // Update properties on the user document
  // updateUser(user: User, data: any) {
  //   return this.afs.doc(`users/${user.uid}`).update(data);
  // }
  //// Email/Password Auth ////

  emailSignUp(email: string, password: string, theusername: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        // this.gt.database.ref().child()
        // this.afs.doc<User>(`users/${user.user.uid}`).collection(`users/${user.user.uid}`);

        firebase.database().ref(`users/${user.user.uid}`).push({
          'username': theusername,
          // 'region': theregion
        });
        // firebase.database().ref(`users/${user.user.uid}`).push(theregion);
        // this.ref.database.ref().child('users').child(user.user.uid).set({
        //   username : theusername,
        //   region: theregion
        // });
        // create initial user document
      })
      .catch(error => this.handleError(error));
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
  signup(email: string, password: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error =>
      console.log(error)
    );

  }
  // AuthenticationStatus(){
  //   this.afAuth.authState.subscribe(user => {
  //     if (user) {
  //       // go to home page
  //     } else {
  //       // go to login page
  //     }
  //   });
  // }
  currentuser() {
    return firebase.auth().currentUser;
  }

}
