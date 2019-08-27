import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results: any[] = [];
  response: any;
  queryField: FormControl = new FormControl();

  userInfo: any;

  constructor(private _searchService: SearchService) {
    this._searchService.userRequest(name).subscribe( userInfo => {
      console.log(userInfo);
      this.userInfo = userInfo;
    });
  }
  searchGit(name) {
    this._searchService.userRequest(name).subscribe(userInfo => {
      console.log(userInfo);
     //  console.log(userInfo.error);
      this.userInfo = userInfo;
    });
    // this.searchRepo(name);
  }

  ngOnInit() {
  this.queryField.valueChanges
  .pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((query) =>  this._searchService.userRequest(query))
    )
  .subscribe(result => {
    // if (result.name.length < 1) { return; } else {   this.results = result.json(); }
    this.results = [];
    this.results.push(result.avatar_url + result.name);
    console.log(result.avatar_url);
    // this.searchGit(result);
  });


    // this.queryField.valueChanges
    // .pipe(
      // debounceTime(200),
      // distinctUntilChanged(),
      // switchMap((query) =>  this._searchService.search(query))
      // )
      // .subscribe( result => { if (result.status === 400) { return; } else {this.results = result.json().artists.items; }});
    // tslint:disable-next-line: max-line-length
    // .subscribe(queryField => this._searchService.search(queryField).subscribe(response => this.results = this.response.json().artists.items));

  }

}
