import { Component, OnInit } from '@angular/core';
import { ViewlistingsService } from 'src/app/services/viewlistings.service';
import { FormBuilder } from '@angular/forms';
import { Housing } from 'src/app/models/housing.model';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.css']
})
export class HousingListComponent implements OnInit {

  houses: Housing[];
  type: number = 3;
  displayOrNot: boolean = true;

  constructor(
    private myData: ViewlistingsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllHousing(this.type);
  }



  getAllHousing(type) {
    this.myData.listHousing(type).subscribe(
      (data: Housing[]) => {
        this.houses = data;
        console.log(this.houses);
        if (this.houses.length < 0) {
          this.displayOrNot = false;
        } else {
          this.displayOrNot = true;
        }

      },
      (error: any) => console.log(error),
      () => console.log('All housing')
    );
  }

}
