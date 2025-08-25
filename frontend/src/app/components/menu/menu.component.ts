import { CommonModule } from '@angular/common'
import { Component, Input, type OnInit } from '@angular/core'
import type { PublicItem, PublicSection } from '@lafontaine/backend/src/types'
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
  @Input() facebookUrl = ''
  @Input() tripadvisorUrl = ''
  @Input() googleUrl = ''

  sections: PublicSection[] = []
  sectionsLoading = true
  sectionsError: string | null = null
  sectionItems: { [sectionId: number]: PublicItem[] } = {}
  expandedSections: Set<number> = new Set()
  loadingSections: Set<number> = new Set()

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadSections()
  }

  loadSections(): void {
    this.menuService.getAllSections().subscribe({
      next: (sections) => {
        this.sections = sections
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
        this.sectionItems[sectionId] = items
        this.loadingSections.delete(sectionId)
      },
      error: (error) => {
        this.loadingSections.delete(sectionId)
        console.error(`Error loading items in section ${sectionId}:`, error)
      },
    })
  }

  isSectionExpanded(sectionId: number): boolean {
    return this.expandedSections.has(sectionId)
  }

  isSectionLoading(sectionId: number): boolean {
    return this.loadingSections.has(sectionId)
  }

  getSectionItems(sectionId: number): PublicItem[] {
    return this.sectionItems[sectionId] || []
  }
}
