import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
  clientID: string = 'ICUL9AG3pIKFnYlHdq8txw'; 
  baseUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientID + '&q=';
  constructor( private _http: HttpClient) {
    console.log('Ready');
   }

  userRequest(name: string) {
    interface IApiResponse {
      name: string;
      login: string;
      avatar_url: string;
      followers: string;
      following: string;
      public_repos: string;
      html_url: string;
    }
    return this._http.get<IApiResponse>('https://api.github.com/users/'
      + name + '?access_token=' + environment.secretKey).pipe(map(res => res));
  }
  search(queryString: string) {
    let _URL = this.baseUrl + queryString;
    return this._http.get(_URL);
  }
}
// 'T9i-gFZXxBL7KIaI0mAMU8cutDUCDmnYhb_OMllFRMDvWg-HH5_5reIc7EY264Dmh7hhO3qvKCl_wTtRDpoAxUvv0Ou4tDEmiUgvSvehQOtLNHMqit2r1RQgFnYwXXYx'
