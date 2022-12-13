import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldTemporalExtentComponent } from './form-field-temporal-extent.component'

describe('FormFieldTemporalExtentComponent', () => {
  let component: FormFieldTemporalExtentComponent
  let fixture: ComponentFixture<FormFieldTemporalExtentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldTemporalExtentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldTemporalExtentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
