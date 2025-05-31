import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Item } from '../../models/menu.models'
import { MenuService } from '../../services/menu.service'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: Item[] = []
  loading = true
  error: string | null = null

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadItems()
  }

  loadItems(): void {
    this.menuService.getAllItems().subscribe({
      next: (items) => {
        this.items = items
        this.loading = false
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement du menu'
        this.loading = false
        console.error('Error loading items:', error)
      },
    })
  }
}
