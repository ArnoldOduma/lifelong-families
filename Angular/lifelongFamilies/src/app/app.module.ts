import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './components/home/home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SearchService } from './services/search.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Error404Component } from './components/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MoreInfoComponent } from './components/more-info/more-info.component';

import { ListComponent } from './components/list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCheckboxModule, MatStepperModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { AdminComponent } from './components/admin/admin.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AgmCoreModule } from '@agm/core';
// import { AuthGuard } from './AuthGuard.component';
import { ContentLoaderModule } from 'ngx-content-loader';

import { ServicesListComponent } from './components/services-list/services-list.component';
import { HousingListComponent } from './components/housing-list/housing-list.component';
import { BusinessesListComponent } from './components/businesses-list/businesses-list.component';
import { ViewListingComponent } from './components/view-listing/view-listing.component';
import { BusinessService, BusinessServiceAdapter } from './models/business-service.model';
import { PostBusinessServiceComponent } from './components/post-business-service/post-business-service.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PaymentsComponent } from './components/payments/payments.component';
import { InterceptorService } from './services/interceptor.service';
import { UserDashComponent } from './components/user-dash/user-dash.component';
import { ViewBusinessesComponent } from './components/user-dash/view-businesses/view-businesses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    LoginComponent,
    SignupComponent,
    MoreInfoComponent,
    ListComponent,
    SearchViewComponent,
    AdminComponent,
    ServicesListComponent,
    HousingListComponent,
    BusinessesListComponent,
    ViewListingComponent,
    PostBusinessServiceComponent,
    PaymentsComponent,
    UserDashComponent,
    ViewBusinessesComponent
    // AuthGuar
  ],
  imports: [
    OwlModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjZRHFkkdjgY5-qoasdrDgwv60xpbyF0Y',
      libraries: ['places']
    }),
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FileUploadModule


  ],
  providers: [
    SearchService, BusinessServiceAdapter,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
