import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { SearchComponent } from '../components/search/search.component';
import { HomeComponent } from '../components/home/home.component';
import { Error404Component } from '../components/error404/error404.component';
import { ServicesService } from '../services/services.service';
import { HousingService } from '../services/housing.service';
import { BusinessService } from '../services/business.service';

const appRoutes: Routes = [
  {path: 'home',
   component: HomeComponent,
    data: {title: 'Lifelong families'}
  },
  {path: '404', component: Error404Component},
  {path: 'search', component: SearchComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: SearchComponent}
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
  
  RouterModule.forRoot(appRoutes,
      {enableTracing: true}
    ),
    CommonModule
  ],
  providers: [BusinessService, ServicesService,HousingService],
  bootstrap: [HomeComponent],
  exports: [RouterModule]
})
export class RoutingModule { }
