import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    // private userauthService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])],
    });
  }
  get email() {
    return this.myForm.get('email');
  }
  get password() {
    return this.myForm.get('password');
  }
  isEmail(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return { noEmail: true };
    }
  }
  isEqualPassword(control: FormControl): { [s: string]: boolean } {
    if (!this.myForm) {
      return { passwordsNotMatch: true };

    }
    if (control.value !== this.myForm.get('password')) {
      return { passwordsNotMatch: true };
    }
  }
  onSignup() {
    console.log("Signing up");
    const currentUser = this.userauthService.currentuser();
    const ty = this.userauthService.signup(this.email.value, this.password.value);

    if (ty != null && currentUser) {
      this.router.navigate(['/home']);
      console.log("Is Authenticated");
      console.log("User cred", ty);
      console.log("Current user", currentUser);
    }
    else {
      console.log("Is not Authenticated")
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
