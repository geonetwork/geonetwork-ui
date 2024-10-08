import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldConstraintsShortcutsComponent } from './form-field-constraints-shortcuts.component';

describe('FormFieldConstraintsShortcutsComponent', () => {
  let component: FormFieldConstraintsShortcutsComponent;
  let fixture: ComponentFixture<FormFieldConstraintsShortcutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldConstraintsShortcutsComponent]
    });
    fixture = TestBed.createComponent(FormFieldConstraintsShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
