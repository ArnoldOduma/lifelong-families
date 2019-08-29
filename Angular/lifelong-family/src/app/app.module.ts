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
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
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
    canLoad:[AuthGuard]

  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'root',
    component: AppComponent,
    canLoad:[AuthGuard]

  },
  {
    path: 'home',
    component: HomeComponent,
    canLoad:[AuthGuard]

  }

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,

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
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
