import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldFileComponent } from './form-field-file.component'
import { FormControl } from '@angular/forms'

describe('FormFieldFileComponent', () => {
  let component: FormFieldFileComponent
  let fixture: ComponentFixture<FormFieldFileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldFileComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldFileComponent)
    component = fixture.componentInstance
    component.control = new FormControl()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
