import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent.component'

describe('FormFieldSpatialExtentComponent', () => {
  let component: FormFieldSpatialExtentComponent
  let fixture: ComponentFixture<FormFieldSpatialExtentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldSpatialExtentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldSpatialExtentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
