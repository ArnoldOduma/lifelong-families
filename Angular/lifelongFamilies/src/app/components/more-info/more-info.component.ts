import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {

  id = this.actRoute.snapshot.params.id;
  category = this.actRoute.snapshot.params.category;
  moreInfoData: any[] = [];
  loc: string;
  coordinates: string;
  cordArray: any[];
  lat;
  long;

  constructor(
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public _searchService: SearchService
  ) { }

  searchMultipleSources() {
    if(this.category == 'housing'){
      return this._searchService.searchFromMultipleSources(this.id,'','').subscribe((data: {}) => {
        this.moreInfoData = data[1];
        console.log(this.moreInfoData);

      });
    }else if(this.category == 'business'){
      return this._searchService.searchFromMultipleSources(this.id,'','').subscribe((data: {}) => {
        this.moreInfoData = data[0];
        console.log(this.moreInfoData);
        

      });
    }else if(this.category == 'services'){
      return this._searchService.searchFromMultipleSources(this.id,'','').subscribe((data: {}) => {
        this.moreInfoData = data[2];
        console.log(this.moreInfoData);

      });
    }

  }

  ngOnInit() {
    this.searchMultipleSources();

    // this.employeeData[0];


    // getBusiness(id){
    //   this.restApi.getBusiness(id)
    // }
  }

}
