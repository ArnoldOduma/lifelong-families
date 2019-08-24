import {Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    
  }
}
