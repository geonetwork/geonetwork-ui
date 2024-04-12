import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldObjectComponent } from './form-field-object.component'

describe('FormFieldObjectComponent', () => {
  let component: FormFieldObjectComponent
  let fixture: ComponentFixture<FormFieldObjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldObjectComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldObjectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
