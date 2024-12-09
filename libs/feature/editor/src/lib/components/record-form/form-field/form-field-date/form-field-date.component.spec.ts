import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl } from '@angular/forms'
import { FormFieldDateComponent } from './form-field-date.component'

describe('FormFieldResourceUpdatedComponent', () => {
  let component: FormFieldDateComponent
  let fixture: ComponentFixture<FormFieldDateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldDateComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldDateComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue(new Date())
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
