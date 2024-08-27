import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldRichComponent } from './form-field-rich.component'

describe('FormFieldRichComponent', () => {
  let component: FormFieldRichComponent
  let fixture: ComponentFixture<FormFieldRichComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldRichComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldRichComponent)
    component = fixture.componentInstance
    component.value = 'Some rich text'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
