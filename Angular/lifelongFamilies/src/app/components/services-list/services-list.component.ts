import { Component, OnInit, HostListener } from '@angular/core';
import { BusinessService } from 'src/app/models/business-service.model';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ViewlistingsService } from 'src/app/services/viewlistings.service';
import * as counties from "src/assets/counties.json";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        opacity: '0',
        height: '0px'
      })),
      state('final', style({
        opacity: '1',
        height: '300px'
      })),
      transition('initial=>final', animate('500ms')),
      transition('final=>initial', animate('700ms'))
    ]),
  ]
})
export class ServicesListComponent implements OnInit {

  services: any;
  listedServices: BusinessService[] = [];
  displayOrNot: boolean = true;

  sessItem: string;
  // searchForm: FormGroup;
  formattedMessage: string;
  countiesArray: any[] = [];
  type = 1;
  name = '';
  city = '';
  county: FormControl;
  minPrice: number;
  maxPrice: number;
  searchTime: any = 0.1;
  public toggleFilters: boolean = false;
  screenWidth: any;
  currentState = 'initial';


  constructor(
    private myData: ViewlistingsService,
    private formBuilder: FormBuilder
  ) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.services = this.getAllBusinessServices(this.type);

    this.sessItem = sessionStorage.getItem('searchname');
    console.log(this.sessItem);

    counties.forEach(element => {
      this.countiesArray.push(element.county);
    });
    // this.formBuild();
    this.onChanges();
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
    this.filtersToggle();
  }
  filtersToggle() {
    if (this.screenWidth > 700) {
      this.currentState = 'final';
    } else {
      this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    }
  }

  // filtersToggle() {
  //   if (this.screenWidth > 700) {
  //     this.toggleFilters = true;
  //   } else {
  //     this.toggleFilters = !this.toggleFilters;
  //   }
  // }


  searchForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    county: ['', [Validators.required]],
    minPrice: ['', [Validators.required]],
    maxPrice: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  changeCounty(e) {
    // console.log(e.value)
    // this.county.setValue(e.target.value, {
    //   onlySelf: true
    // }) 
  }
  get countyName() {
    return this.searchForm.get('county');
  }

  onChanges(): void {
    this.searchForm.valueChanges.subscribe(val => {
      if (val.name.length > 0) {
        this.formattedMessage =
          `You searched for ${val.name} ${val.county}.`;
      }
      sessionStorage.setItem('searchname', val.name);
      this.sessItem = sessionStorage.getItem('searchname');
      console.log(this.sessItem);
      this.searchServices(val.name, val.county, val.category);
    });

  }


  private applyFormValues(group, searchParams) {
    Object.keys(searchParams).forEach(key => {
      let formControl = <FormControl>group.controls[key];

      if (formControl instanceof FormGroup) {
        this.applyFormValues(formControl, searchParams[key]);
      } else {
        formControl.setValue(searchParams[key]);
      }
    });
  }

  searchServices(name, county, category) {
    var start = new Date().getTime();
    this.myData.search(name, county, this.minPrice, this.maxPrice, category).subscribe(
      (data: BusinessService[]) => {
        this.listedServices = data;
        if (this.services.length < 0) {
          this.displayOrNot = false;
        } else {
          this.displayOrNot = true;
        }
      },
      (error: any) => console.log(error),
      () => console.log('Searched successfully')
    ).add(() => {
      var end = new Date().getTime();
      this.searchTime = end - start;
      console.log(this.searchTime);
    });
  }


  getAllBusinessServices(type) {
    var start = new Date().getTime();
    return this.myData.list(type).subscribe(
      (data: BusinessService[]) => {
        this.listedServices = data;
        if (this.services.length < 0) {
          this.displayOrNot = false;
        } else {
          this.displayOrNot = true;
        }

      },
      (error: any) => console.log(error),
      () => console.log('All data gets')
    ).add(() => {
      var end = new Date().getTime();
      this.searchTime = end - start;
      console.log(this.searchTime);
    });
  }


}
