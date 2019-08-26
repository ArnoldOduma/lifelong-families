import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import { SignupComponent } from './signup/signup.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireDatabase} from '@angular/fire/database';
import {FormGroup} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './AuthGuard.component';
const routes: Routes = [
  {
    path: ' ',
    component: SignupComponent,
    canActivate: [AuthGuard]
    // redirectTo: 'items',
    // pathMatch: 'full'

  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'signup',
    component: SignupComponent,

  },
  {
    path: 'home',
    component: AppComponent,

  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,

  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
