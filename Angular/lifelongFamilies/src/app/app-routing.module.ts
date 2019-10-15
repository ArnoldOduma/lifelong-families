import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './modules/user/components/error404/error404.component';

const routes: Routes = [
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
