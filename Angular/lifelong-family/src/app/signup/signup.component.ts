import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {ServicesService} from '../services/firebase.service';
import {isNull} from 'util';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  detailForm: FormGroup;
  products:any = [];
  constructor(public fb: FormBuilder, public auth: ServicesService, private router: Router,) {
  }


  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]
      ],
      password: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ],
      username: ['', [
        Validators.required
      ]
      ],
      region: ['', [
        Validators.required
      ]
      ],
    });
    // Second Step
    // this.detailForm = this.fb.group({
    //   catchPhrase: ['', [ Validators.required ] ]
    // });
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get username() {
    return this.signupForm.get('username');
  }
  get region() {
    return this.signupForm.get('region');
  }

  get catchPhrase() { return this.detailForm.get('catchPhrase'); }


  // Step 1
  signup() {
    console.log('Email', this.email.value);
    console.log('Password', this.password.value);
    console.log('Username', this.username.value);
    console.log('Region', this.region.value);
    if((this.email.value || this.region.value || this.username.value || this.password.value) === (isNull() || "")){
      console.log("Something is Null")
      return false;
    }else {
      return this.auth.emailSignUp(this.signupForm.get('email').value, this.password.value, this.username.value, this.region.value);
    }
  }
  getProducts() {
    this.products = [];
    this.auth.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    });
  }
  authent(){
    return this.router.navigate(['/login']);

  }
  logout(){
    return this.auth.logout();
  }



  // Step 2
//   setCatchPhrase(user) {
//     return this.auth.auth.updateCurrentUser(user,{catchPhrase:  this.catchPhrase.value}))
// };
}
