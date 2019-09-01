import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  getPosts() {
    this._Service.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.posts = data;
        // convert the dates to a nice format
        for (let post of this.posts) {
          post.date = new Date(post.date);
        }
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading posts')
    );
  }
  ngOnInit() {
  }

}
