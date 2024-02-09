import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoolsComponent } from './alcools.component';

describe('AlcoolsComponent', () => {
  let component: AlcoolsComponent;
  let fixture: ComponentFixture<AlcoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlcoolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlcoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
