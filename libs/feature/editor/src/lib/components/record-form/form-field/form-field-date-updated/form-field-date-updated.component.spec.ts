import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl } from '@angular/forms'
import { FormFieldDateUpdatedComponent } from './form-field-date-updated.component'

describe('FormFieldResourceUpdatedComponent', () => {
  let component: FormFieldDateUpdatedComponent
  let fixture: ComponentFixture<FormFieldDateUpdatedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldDateUpdatedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldDateUpdatedComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue(new Date())
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
