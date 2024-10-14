import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldConstraintsComponent } from './form-field-constraints.component';

describe('FormFieldConstraintsComponent', () => {
  let component: FormFieldConstraintsComponent;
  let fixture: ComponentFixture<FormFieldConstraintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldConstraintsComponent]
    });
    fixture = TestBed.createComponent(FormFieldConstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
