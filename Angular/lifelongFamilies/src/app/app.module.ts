import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchComponent } from './components/search/search.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './components/home/home.component';
import { SearchService } from './services/search.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Error404Component } from './components/error404/error404.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BusinessregistrationComponent } from './components/businessregistration/businessregistration.component';
import { AgmCoreModule } from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule, MatIconModule,MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { HousingregistrationComponent } from './components/housingregistration/housingregistration.component';
import { ServiceregistrationComponent } from './components/serviceregistration/serviceregistration.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    Error404Component,
    RegistrationComponent,
    BusinessregistrationComponent,
    HousingregistrationComponent,
    ServiceregistrationComponent
  ],
  imports: [

  BrowserModule,
    RoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjZRHFkkdjgY5-qoasdrDgwv60xpbyF0Y',
      libraries: ['places']
    })
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
