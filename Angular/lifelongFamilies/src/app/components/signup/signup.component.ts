import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { environment } from '../';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNull } from 'util';
import { FirebaseService } from '../../services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  // detailForm: FormGroup;
  // email: string;
  // username: FormControl;
  // password1: string;
  // password2: string;
  passError: boolean = false;
  userSessKey: string;
  usernameUnavailable: string;
  emailUnavailable: string;
  loader: boolean = false;
  successMessage: boolean = false;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private userAuthService: UserAuthServiceService
  ) {
    this.signupForm = this.createFormGroup();
    this.usernameUnavailable = '';
    this.emailUnavailable = '';
  }


  ngOnInit() {
    this.createFormGroup();
  }


  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)])

    }, {
        validators: this.checkPasswords
      });
  }
  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password1() {
    return this.signupForm.get('password1');
  }
  get password2() {
    return this.signupForm.get('password2');
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password1').value;
    let confirmPass = group.get('password2').value;

    return pass === confirmPass ? null : { notSame: true }
  }
  revert() {
    this.signupForm.reset();
  }

  onSubmit() {
    this.loader = true;
    if (this.password1.value != this.password2.value) {
      this.passError = true;
    } else {
      let user: User = {
        username: this.username.value,
        email: this.email.value,
        password1: this.password1.value,
        password2: this.password2.value
      };
      this.userAuthService.registerUser(user).subscribe(
        (res: any) => {
          this.loader = false;
          this.successMessage = true;
          sessionStorage.setItem('userSessKey', res.key.toString());
          this.userSessKey = sessionStorage.getItem('userSessKey');
          setTimeout(() => {
            this.successMessage = false;
            this.router.navigate([`/user-dash/${this.userSessKey}`]);
          }, 2000);
        },
        (error: HttpErrorResponse) => {
          this.loader = false;
          this.usernameUnavailable = '';
          this.emailUnavailable = '';
          if (error.error instanceof Error) {
          } else {
            if (error.status === 400) {
              this.usernameUnavailable = error.error.username;
              this.emailUnavailable = error.error.email;
            } else {

            }
          }
        }
      );
    }
  }
}
