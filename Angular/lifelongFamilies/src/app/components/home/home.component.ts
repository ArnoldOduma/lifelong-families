import { Component, OnInit } from '@angular/core';
import { Housing } from '../../shared/housing';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Housing: any = [];
  constructor(public _searchService: SearchService) { }

  loadHousing() {
    return this._searchService.getHousing().subscribe((data: {}) => {
      this.Housing = data;
    });
  }

  ngOnInit() {
    this.loadHousing();
  }

}
