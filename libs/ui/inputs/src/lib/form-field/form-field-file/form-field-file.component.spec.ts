import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldFileComponent } from './form-field-file.component'

describe('FormFieldFileComponent', () => {
  let component: FormFieldFileComponent
  let fixture: ComponentFixture<FormFieldFileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldFileComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldFileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
