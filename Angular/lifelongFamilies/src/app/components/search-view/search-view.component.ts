import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Housing } from 'src/app/shared/housing';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  query = this.actRoute.snapshot.params.query;
  location = this.actRoute.snapshot.params.location;
  Category: any[] = [];
  listBusiness: any;
  listHousing: any;
  listServices: any;

  searchedResults: any [] = [];
  elName: string;
  elRes: string;


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

  search(data){
    this.searchedResults = [];
    this.listBusiness.forEach(element => {
      this.elName = element.category;
      this.elName.toLowerCase; 
      this.elRes = data;
      if (this.elName.indexOf(data) != -1) {
        this.searchedResults.push(element);
      }
    });
    this.listServices.forEach(element => {
      this.elName = element.category;
      this.elName.toLowerCase;
      if (this.elName.indexOf(data) != -1) {
        this.searchedResults.push(element);
      }
    });
    console.log(this.listServices);
    return true;
  }

  getAllData(){
    return this._searchService.getAllSources()
    .subscribe( data => {
      this.listBusiness = data[0];
      this.listHousing = data[1];
      this.listServices   = data[2];
      console.log('Bs => ' + this.listBusiness);

      this.listBusiness.forEach(element => {
        if (this.Category.includes(element.category) === false) {
          this.Category.push(element.category);
        }

      });
    });
  }

  searchMultipleSources() {
    // if (this.category == 'housing') {
      return this._searchService.searchFromMultipleSources('', '', '').subscribe( (data: {}) => {
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
    // this.searchMultipleSources();
    this.getAllData();

    // this.queryField.valueChanges
    //   .subscribe(result => console.log(this.results + result));


    this.queryField.valueChanges
      .subscribe(queryField => {
        this.search(queryField);
      });
  }
}
