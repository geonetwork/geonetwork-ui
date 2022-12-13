import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldRichComponent } from './form-field-rich.component'

describe('FormFieldRichComponent', () => {
  let component: FormFieldRichComponent
  let fixture: ComponentFixture<FormFieldRichComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldRichComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldRichComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
