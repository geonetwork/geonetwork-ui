import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintCardComponent } from './constraint-card.component';

describe('ConstraintCardComponent', () => {
  let component: ConstraintCardComponent;
  let fixture: ComponentFixture<ConstraintCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConstraintCardComponent]
    });
    fixture = TestBed.createComponent(ConstraintCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
