import { Component } from '@angular/core'
import { MenuComponent } from './components/menu/menu.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'La Fontaine Mons - Menu'
}
