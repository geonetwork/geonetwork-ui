import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldKeywordsComponent } from './form-field-keywords.component';

describe('FormFieldKeywordsComponent', () => {
  let component: FormFieldKeywordsComponent;
  let fixture: ComponentFixture<FormFieldKeywordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldKeywordsComponent]
    });
    fixture = TestBed.createComponent(FormFieldKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
