import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() section!: any
  @Input() items: any[] = []
  @Input() isExpanded = false
  @Input() isLoading = false

  @Output() sectionClick = new EventEmitter<number>()

  onSectionClick(): void {
    this.sectionClick.emit(this.section.sectionId)
  }
}
