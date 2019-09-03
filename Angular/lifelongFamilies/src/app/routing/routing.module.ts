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
// import { AuthGuard } from '../AuthGuard.component';

const appRoutes: Routes = [
  {path: 'home',
   component: HomeComponent,
    data: {title: 'Lifelong families'}
  },
  {path: '404', component: Error404Component},
  {path: 'search/:query/:location', component: SearchViewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'info/:id/:category', component: MoreInfoComponent},
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: SearchViewComponent}
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
