import { Component, OnInit } from '@angular/core';
import { Housing } from '../../shared/housing';
import { SearchService } from 'src/app/services/search.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public _searchService: SearchService) { }

  Results: any = [];
  BusinessResults: any = [];
  ServicesResults: any = [];
  HousingResults: any = [];
  homeSearchField: FormControl = new FormControl();
  nearSearchField: FormControl = new FormControl();

  BusinessNear: any[] = [];
  HousingNear: any[] = [];
  ServicesNear: any[] = [];
  SearchArray: any[] = [];
  distanceAppart: any;
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  geolocationPosition: any;
  elName: string;
  lowerElName: string;
  elRes: string;
  loc: any;
  coordinates: any;
  public SpecificData: any;

  carouselOptions = {
    margin: 25,
    nav: true,
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
        nav: true
      },
      600: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
      },
      1500: {
        items: 5,
        nav: true,
      }
    }
  }
  images = [
    {
      text: "Hotels",
      icon: "fas fa-hotel"
    },
    {
      text: "Housing",
      icon: "fas fa-home"
    },
    {
      text: "Shoping",
      icon: "fas fa-shopping-bag"
    },
    {
      text: "Services",
      icon: "fas fa-user-tie"
     
    },
    {
      text: "Food & Beverages",
      icon: "fas fa-wine-bottle"
    }
  ]

  public getSpecific(id) {
    this.BusinessResults.forEach(element => {
      this.elName = element.id;
      if (this.elName.indexOf(id) != -1) {
        this.SpecificData = element;
      }
    });
    console.log(this.SpecificData);
  }

  appendData(data) {
    this.homeSearchField.setValue(data);
  }

  loadData() {
    return this._searchService.getAllSources().subscribe((data: {}) => {
      this.BusinessResults = data[0];
      this.HousingResults = data[1];
      this.ServicesResults = data[2];
      data[0].forEach(element => {
        this.lat2 = element.location.coordinates[0];
        this.lon2 = element.location.coordinates[1];
        this.distance(this.lat1, this.lon1, this.lat2, this.lon2);

        if (this.distanceAppart < 6000) {
          this.BusinessNear.push(element);
        }
      });
      data[1].forEach(element => {
        this.lat2 = element.location.coordinates[0];
        this.lon2 = element.location.coordinates[1];
        this.distance(this.lat1, this.lon1, this.lat2, this.lon2);

        if (this.distanceAppart < 6000) {
          this.HousingNear.push(element);
        }
      });
      data[2].forEach(element => {
        this.lat2 = element.location.coordinates[0];
        this.lon2 = element.location.coordinates[1];
        this.distance(this.lat1, this.lon1, this.lat2, this.lon2);

        if (this.distanceAppart < 6000) {
          this.ServicesNear.push(element);
        }
      });
    });
  }
  loadDataFallback(){
    return this._searchService.getAllSources().subscribe((data: {}) => {
      this.BusinessResults = data[0];
      this.HousingResults = data[0];
      this.ServicesResults = data[0];

      this.BusinessNear = this.BusinessResults;
      this.HousingNear = this.HousingResults;
    });
  }

  toRad(Value) {
    return Value * Math.PI / 180;
  }

  distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    // tslint:disable-next-line: prefer-const
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    this.distanceAppart = d;
    console.log('Distance Appart => ' + d);
    return d;
  }
  getLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position,
            this.lat1 = position.coords.latitude,
            this.lon1 = position.coords.longitude,
            console.log('lat => ' + this.lat1);
          console.log(this.lon1);
          this.nearSearchField.setValue('Near You');
          this.loadData();

        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              // tslint:disable-next-line: max-line-length
              alert('Please click the enable location icon on  your browser to allow location services for a better experience.\nYour location data will remain private');
              // this.loadDataFallback();
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  searchResults() {
    this.homeSearchField.valueChanges
      .subscribe(result => {
        this.SearchArray = [];
        this.BusinessResults.forEach(element => {
          this.elName = element.category;
          this.lowerElName = this.elName.toLowerCase();
          this.elRes = result;
          if (this.lowerElName.indexOf(result) != -1 || this.elName.indexOf(result) != -1) {
            this.SearchArray.push(element);
            console.log(this.lowerElName);
          }
          console.log(this.lowerElName);
          // console.log(this.elName);
          console.log(result);
        });
        this.ServicesResults.forEach(element => {
          this.elName = element.category;
          this.lowerElName = this.elName.toLowerCase();
          this.elRes = result;
          if (this.lowerElName.indexOf(result) != -1 || this.elName.indexOf(result) != -1) {
            this.SearchArray.push(element);
            console.log(this.lowerElName);
          }
          console.log(this.lowerElName);
          console.log(result);
        });

        this.HousingResults.forEach(element => {
          this.elName = element.name;
          this.lowerElName = this.elName.toLowerCase();
          this.elRes = result;
          if (this.lowerElName.indexOf(result) != -1 || this.elName.indexOf(result) != -1) {
            this.SearchArray.push(element);
            console.log('lower Housing res =>' + this.lowerElName);
          }
          console.log(this.lowerElName);
          // console.log(this.elName);
          console.log('Housing res =>' + this.lowerElName);
        });
        console.log('Service =>' + this.ServicesResults);
        console.log('Housing =>' + this.HousingResults);

        console.log('search array =>' + this.SearchArray);
        console.log('bs array =>' + this.BusinessResults);
      });
  }



  ngOnInit() {
    this.getLocation();
    if (this.HousingNear.length < 1) {
      this.loadData();
    } else {
      console.log(this.BusinessResults);
    }

    this.homeSearchField.valueChanges
      .subscribe(result => {
        // this.SearchArray = [];
        this.searchResults();
      });
    // this.calculateAppart();





    // this.homeSearchField.valueChanges
    //   .subscribe(queryField => this._searchService.searchFromMultipleSources(queryField)
    //     .subscribe(response => {
    //       this.Results = response[0];
    //       this.BusinessResults = response[1];
    //       console.log(this.Results);
    //     }));


  }
}
