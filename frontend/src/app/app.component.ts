import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { faWhiskeyGlass, faGlassWaterDroplet, faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { environment } from './environments/environment.prod'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = false;
  faWhiskeyGlass = faWhiskeyGlass;
  faGlassWater = faGlassWaterDroplet;
  fafaBeerMugEmpty = faBeerMugEmpty;
  facebookUrl = environment.facebookUrl;
  tripadvisorUrl = environment.tripadvisorUrl
  googleUrl = environment.GoogleUrl;

  constructor(private observer: BreakpointObserver) { }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      // this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      // this.isCollapsed = !this.isCollapsed;
    }
  }

}