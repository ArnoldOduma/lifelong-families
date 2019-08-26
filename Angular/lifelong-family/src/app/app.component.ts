import {Component, OnInit} from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {ServicesService} from './services/firebase.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lifelong-family';



  constructor(public afAuth: ServicesService,private router: Router) {
    if(this.afAuth.currentuser()){
      console.log("App component current user positive",this.afAuth.currentuser())
      this.router.navigateByUrl('/home');
    } else{
      console.log("App component current user negative",this.afAuth.currentuser())
      this.router.navigateByUrl('/login');
    }


  }

  ngOnInit() {

  }
}
