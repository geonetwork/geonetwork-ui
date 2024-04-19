import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldRichComponent } from './form-field-rich.component'
import { FormControl } from '@angular/forms'

describe('FormFieldRichComponent', () => {
  let component: FormFieldRichComponent
  let fixture: ComponentFixture<FormFieldRichComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldRichComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldRichComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue('Some rich text')
    component.control = control
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
