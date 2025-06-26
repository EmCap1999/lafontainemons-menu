import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Item, Section } from '../../models/menu.models'

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() section!: Section
  @Input() items: Item[] = []
  @Input() isExpanded: boolean = false
  @Input() isLoading: boolean = false

  @Output() sectionClick = new EventEmitter<number>()

  onSectionClick(): void {
    this.sectionClick.emit(this.section.sectionId)
  }
}
