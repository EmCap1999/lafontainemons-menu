import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Item, Section } from '../../models/menu.models'
import { MenuService } from '../../services/menu.service'
import { SectionComponent } from '../section/section.component'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  sections: Section[] = []
  sectionsLoading = true
  sectionsError: string | null = null
  sectionItems: { [sectionId: number]: Item[] } = {}
  expandedSections: Set<number> = new Set()
  loadingSections: Set<number> = new Set()

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadSections()
  }

  loadSections(): void {
    this.menuService.getAllSections().subscribe({
      next: (sections) => {
        this.sections = sections.sort((a, b) => a.displayOrder - b.displayOrder)
        this.sectionsLoading = false
      },
      error: (error) => {
        this.sectionsLoading = false
        console.error('Error loading sections:', error)
      },
    })
  }

  onSectionClick(sectionId: number): void {
    if (this.expandedSections.has(sectionId)) {
      this.expandedSections.delete(sectionId)
    } else {
      this.expandedSections.add(sectionId)
      if (!this.sectionItems[sectionId]) {
        this.loadSectionItems(sectionId)
      }
    }
  }

  loadSectionItems(sectionId: number): void {
    this.loadingSections.add(sectionId)

    this.menuService.getItemsBySection(sectionId).subscribe({
      next: (items) => {
        this.sectionItems[sectionId] = items.sort(
          (a, b) => a.displayOrder - b.displayOrder,
        )
        this.loadingSections.delete(sectionId)
      },
      error: (error) => {
        this.loadingSections.delete(sectionId)
        console.error(`Error loading items for section ${sectionId}:`, error)
      },
    })
  }

  isSectionExpanded(sectionId: number): boolean {
    return this.expandedSections.has(sectionId)
  }

  isSectionLoading(sectionId: number): boolean {
    return this.loadingSections.has(sectionId)
  }

  getSectionItems(sectionId: number): Item[] {
    return this.sectionItems[sectionId] || []
  }
}
