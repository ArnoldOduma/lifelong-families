import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { SearchComponent } from '../components/search/search.component';
import { HomeComponent } from '../components/home/home.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { BusinessregistrationComponent } from '../components/businessregistration/businessregistration.component';
import { HousingregistrationComponent } from '../components/housingregistration/housingregistration.component';
import { ServiceregistrationComponent } from '../components/serviceregistration/serviceregistration.component';
import { Error404Component } from '../components/error404/error404.component';

const appRoutes: Routes = [
  {path: 'home',
   component: HomeComponent,
    data: {title: 'Lifelong families'}
  },
  {path: '404', component: Error404Component},
  {path: 'search', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'businessregistration', component: BusinessregistrationComponent},
  {path: 'housingregistration', component: HousingregistrationComponent},
  {path: 'serviceregistration', component: ServiceregistrationComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: SearchComponent}
];

@NgModule({
  declarations: [],
  imports: [

  RouterModule.forRoot(appRoutes,
      {enableTracing: true}
    ),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
