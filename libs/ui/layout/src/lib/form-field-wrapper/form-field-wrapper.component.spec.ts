import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldWrapperComponent } from './form-field-wrapper.component'

describe('FormFieldWrapperComponent', () => {
  let component: FormFieldWrapperComponent
  let fixture: ComponentFixture<FormFieldWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldWrapperComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldWrapperComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
