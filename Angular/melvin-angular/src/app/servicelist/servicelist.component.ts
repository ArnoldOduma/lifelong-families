import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {
  isLinear = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      threeCtrl: ['', Validators.required],
    });
    this.formGroup2 = this._formBuilder.group({
      fourCtrl: ['', Validators.required],
      fiveCtrl: ['', Validators.required],
      sixCtrl: ['', Validators.required],
      sevenCtrl: ['', Validators.required],
    });
    this.formGroup3 = this._formBuilder.group({
      eightCtrl: ['', Validators.required],
    });
  }

}
