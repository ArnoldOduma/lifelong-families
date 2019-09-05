import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Housing } from 'src/app/shared/housing';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  // @Input() state: boolean;


  showBack: AppComponent;
  // showBack.showBack = true;


  query = this.actRoute.snapshot.params.query;
  location = this.actRoute.snapshot.params.location;
  Category: any[] = [];
  listBusiness: any;
  listHousing: any; 
  listServices: any;

  allData: any;
  displayedHousing: any[] = [];
  displayedBusiness: any[] = [];
  displayedServices: any[] = [];


  searchedResults: any[] = [];
  elName: string;
  elRes: string;
  lowerElName: string;

  CityBusiness: any = [];
  results: any = [];
  businessResults: any = [];
  filteredBusiness: any = [];
  myGroup: any;

  queryField: FormControl = new FormControl();

  constructor(private _searchService: SearchService,
    private _formBuilder: FormBuilder,
    public actRoute: ActivatedRoute
  ) { }

  checked() {
    this.searchedResults = [];
  }
  search(data) {
    this.displayedHousing = [];
    this.displayedBusiness = [];
    this.displayedServices = [];

    this.listBusiness.forEach(element => {
      this.elName = element.category;
      this.elName.toLowerCase;
      this.elRes = data;
      if (this.elName.indexOf(data) != -1) {
        this.displayedBusiness.push(element);
      }
    });
    this.listServices.forEach(element => {
      this.elName = element.category;
      this.elName.toLowerCase;
      if (this.elName.indexOf(data) != -1) {
        this.displayedServices.push(element);
      }
    });
    this.listHousing.forEach(element => {
      this.elName = element.name;
      this.elName.toLowerCase;
      if (this.elName.indexOf(data) != -1) {
        this.displayedHousing.push(element);
      }
    });
    console.log(this.listServices);
    return true;
  }

  getAllData() {
    // this.displayedHousing = [];
    // this.displayedBusiness = [];
    // this.displayedServices = [];

    return this._searchService.getAllSources()
      .subscribe(data => {
        this.listBusiness = data[0];
        this.listHousing = data[1];
        this.listServices = data[2];
        console.log('Bs => ' + this.listBusiness);

        this.listServices.forEach(element => {
          this.elName = element.category;
          this.lowerElName = this.elName.toLowerCase();
          this.elRes = this.query;
          if (this.lowerElName.indexOf(this.query) != -1 || this.elName.indexOf(this.query) != -1) {
            this.displayedServices.push(element);
          }
        });
        this.listBusiness.forEach(element => {
          this.elName = element.category;
          this.lowerElName = this.elName.toLowerCase();
          this.elRes = this.query;
          if (this.lowerElName.indexOf(this.query) != -1 || this.elName.indexOf(this.query) != -1) {
            this.displayedBusiness.push(element);
          }
        });
        this.listHousing.forEach(element => {
          this.elName = element.name;
          this.lowerElName = this.elName.toLowerCase();
          this.elRes = this.query;
          if (this.lowerElName.indexOf(this.query) != -1 || this.elName.indexOf(this.query) != -1) {
            this.displayedHousing.push(element);
          }
        });
      });
  }

  searchMultipleSources() {
    // if (this.category == 'housing') {
    return this._searchService.searchFromMultipleSources('', '', '').subscribe((data: {}) => {
      this.listBusiness = data[2];
      console.log('Bs => ' + this.listBusiness);
      this.listBusiness.forEach(element => {
        if (this.Category.includes(element.category) === false) {
          this.Category.push(element.category);
        }

      });
    });

  }

  ngOnInit() {
    // this.show();

    // this.searchMultipleSources();
    this.getAllData();
    if (this.getAllData().toString.length > 0) {

    }


    // this.queryField.valueChanges
    //   .subscribe(result => console.log(this.results + result));

    console.log(this.query + this.location);
    console.log('all' + this.allData);

    this.queryField.valueChanges
      .subscribe(queryField => {
        this.search(queryField);
        console.log(queryField);
      });
  }
}
