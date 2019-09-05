import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  verified: boolean = false;
  showNav: AppComponent;
  verifiedState(state){
    return true;
  };



  constructor() { }

  ngOnInit() {


  }

}
