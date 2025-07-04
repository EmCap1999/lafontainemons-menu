import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { SectionComponent } from './section.component'

describe('SectionComponent', () => {
  let component: SectionComponent
  let fixture: ComponentFixture<SectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
