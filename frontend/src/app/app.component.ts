import { Component } from '@angular/core'
import { environment } from '../environments/environment'
import { FooterComponent } from './components/footer/footer.component'
import { MenuComponent } from './components/menu/menu.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'La Fontaine Mons'
  facebookUrl = environment.facebookUrl
  tripadvisorUrl = environment.tripadvisorUrl
  googleUrl = environment.googleUrl
}
