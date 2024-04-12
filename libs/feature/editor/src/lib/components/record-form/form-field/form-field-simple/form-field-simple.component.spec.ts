import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldSimpleComponent } from './form-field-simple.component'
import { FormControl } from '@angular/forms'

describe('FormFieldSimpleComponent', () => {
  let component: FormFieldSimpleComponent
  let fixture: ComponentFixture<FormFieldSimpleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldSimpleComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldSimpleComponent)
    component = fixture.componentInstance
    component.control = new FormControl()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
