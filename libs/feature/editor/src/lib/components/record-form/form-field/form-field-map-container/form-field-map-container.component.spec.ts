import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldMapContainerComponent } from './form-field-map-container.component';

describe('FormFieldMapContainerComponent', () => {
  let component: FormFieldMapContainerComponent;
  let fixture: ComponentFixture<FormFieldMapContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldMapContainerComponent]
    });
    fixture = TestBed.createComponent(FormFieldMapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
