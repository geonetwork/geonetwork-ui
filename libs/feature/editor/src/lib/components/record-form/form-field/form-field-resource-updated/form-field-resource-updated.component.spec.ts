import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl } from '@angular/forms'
import { FormFieldResourceUpdatedComponent } from './form-field-resource-updated.component'

describe('FormFieldResourceUpdatedComponent', () => {
  let component: FormFieldResourceUpdatedComponent
  let fixture: ComponentFixture<FormFieldResourceUpdatedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldResourceUpdatedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldResourceUpdatedComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue(new Date())
    component.control = control
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
