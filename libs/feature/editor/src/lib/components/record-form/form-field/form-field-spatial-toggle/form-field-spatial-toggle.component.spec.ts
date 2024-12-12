import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldSpatialToggleComponent } from './form-field-spatial-toggle.component';

describe('FormFieldSpatialToggleComponent', () => {
  let component: FormFieldSpatialToggleComponent;
  let fixture: ComponentFixture<FormFieldSpatialToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldSpatialToggleComponent]
    });
    fixture = TestBed.createComponent(FormFieldSpatialToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
