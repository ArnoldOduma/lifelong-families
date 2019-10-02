import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { SearchViewComponent } from '../components/search-view/search-view.component';
import { HomeComponent } from '../components/home/home.component';
import { Error404Component } from '../components/error404/error404.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { MoreInfoComponent } from '../components/more-info/more-info.component';
import { ListComponent } from '../components/list/list.component';
import { AdminComponent } from '../components/admin/admin.component';
import { HousingListComponent } from '../components/housing-list/housing-list.component';
import { ServicesListComponent } from '../components/services-list/services-list.component';
import { BusinessesListComponent } from '../components/businesses-list/businesses-list.component';
import { ViewListingComponent } from '../components/view-listing/view-listing.component';
import { PostBusinessServiceComponent } from '../components/post-business-service/post-business-service.component';
import { PaymentsComponent } from '../components/payments/payments.component';
import { UserDashComponent } from '../components/user-dash/user-dash.component';
import { ViewBusinessesComponent } from '../components/user-dash/view-businesses/view-businesses.component';
// import { AuthGuard } from '../AuthGuard.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Lifelong families' }
  },
  { path: '404', component: Error404Component },
  { path: 'search/:query/:location', component: SearchViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'info/:id/:category', component: MoreInfoComponent },
  { path: 'list', component: ListComponent },
  { path: 'view/:id', component: ViewListingComponent },
  { path: 'make-payment', component: PaymentsComponent },
  {
    path: 'user-dash',
    component: UserDashComponent,
    children: [
      { path: 'view-businesses', component: ViewBusinessesComponent }
    ]
  },



  { path: 'post-listing/:type', component: PostBusinessServiceComponent },
  { path: 'businesses', component: BusinessesListComponent },
  { path: 'housing', component: HousingListComponent },
  { path: 'services', component: ServicesListComponent },

  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  declarations: [],
  imports: [

    RouterModule.forRoot(appRoutes,
      { enableTracing: true }
    ),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
