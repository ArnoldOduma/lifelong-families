import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NavigationEnd, Router } from '@angular/router';

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

  updates: boolean = false;

  constructor(
    updates: SwUpdate,
    private router: Router) {
    updates.available.subscribe(event => {
      this.updates = true;
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

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
  hideNav(state: boolean) {
    this.showNav = state;
  }

  ngOnInit() {
    console.log(this.showNav);
    // this.hideNav(false);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
