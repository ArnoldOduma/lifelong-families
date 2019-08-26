import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-housinglist',
  templateUrl: './housinglist.component.html',
  styleUrls: ['./housinglist.component.css']
})
export class HousinglistComponent implements OnInit {
  isLinear = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
      this.formGroup1 = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required],
      });
      this.formGroup2 = this._formBuilder.group({
        thirdCtrl: ['', Validators.required],
        fourthCtrl: ['', Validators.required],
        fifthCtrl: ['', Validators.required],
        sixCtrl: ['', Validators.required],
        sevenCtrl: ['', Validators.required],
        eightCtrl: ['', Validators.required],
        nineCtrl: ['', Validators.required],
      });
      this.formGroup3 = this._formBuilder.group({
        tenCtrl: ['', Validators.required],
      });
  }

}
