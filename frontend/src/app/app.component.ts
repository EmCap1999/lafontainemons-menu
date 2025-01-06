import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  faBars,
  faHome,
  faWhiskeyGlass,
  faGlassWaterDroplet,
  faBeerMugEmpty,
  faIceCream,
  faMugHot,
  faWineBottle,
  faCocktail
} from '@fortawesome/free-solid-svg-icons';

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

  faBars = faBars;
  faHome = faHome;
  faIceCream = faIceCream;
  faMugHot = faMugHot;
  faWineBottle = faWineBottle;
  faWhiskeyGlass = faWhiskeyGlass;
  faGlassWater = faGlassWaterDroplet;
  fafaBeerMugEmpty = faBeerMugEmpty;
  faCocktail = faCocktail;

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
    } else {
      this.sidenav.open();

    }
  }

}