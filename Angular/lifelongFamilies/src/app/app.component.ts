import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LIFELONG FAMILIES';
  showNav = true;
  // showBack = false;
  state = {
    state: false
  };

  downloadPwa() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // showInstallPromotion();
    });

    {

    }
  }
  hideNav(state: boolean){
    this.showNav = state;
  }

  ngOnInit() {
    console.log(this.showNav);
    // this.hideNav(false);
  }
}
