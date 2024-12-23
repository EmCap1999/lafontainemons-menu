import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { faWhiskeyGlass, faGlassWaterDroplet, faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private observer: BreakpointObserver, private toastr: ToastrService) { }

  ngOnInit() {
    this.toastr.info(
      `🎉 Le TCS vous souhaite de merveilleuses fêtes de fin d'année ! ✨`,
      'Message festif',
      {}
    ); 
  
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