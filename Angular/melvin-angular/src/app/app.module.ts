import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ListComponent } from './list/list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule, MatIconModule,MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { BusinesslistComponent } from './businesslist/businesslist.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { HousinglistComponent } from './housinglist/housinglist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    ListComponent,
    BusinesslistComponent,
    ServicelistComponent,
    HousinglistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
