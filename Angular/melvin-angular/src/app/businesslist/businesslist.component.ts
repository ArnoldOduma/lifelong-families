import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-businesslist',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./businesslist.component.css']
})
export class BusinesslistComponent implements OnInit {
  isLinear = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
      this.formGroup1 = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required],
        thirdCtrl: ['', Validators.required],
        fourCtrl: ['', Validators.required],
      });
      this.formGroup2 = this._formBuilder.group({
        fiveCtrl: ['', Validators.required],
        sixCtrl: ['', Validators.required],
        sevenCtrl: ['', Validators.required],
        eightCtrl: ['', Validators.required],
      });
      this.formGroup3 = this._formBuilder.group({
        nineCtrl: ['', Validators.required],
        tenCtrl: ['', Validators.required],
      });
      this.formGroup4 = this._formBuilder.group({
      });
  }

}
