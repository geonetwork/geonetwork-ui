import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormFieldTemporalExtentsDateComponent } from './form-field-temporal-extents-date.component'
import { FormControl } from '@angular/forms'

describe('FormFieldTemporalExtentsDateComponent', () => {
  let component: FormFieldTemporalExtentsDateComponent
  let fixture: ComponentFixture<FormFieldTemporalExtentsDateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldTemporalExtentsDateComponent,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldTemporalExtentsDateComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue([
      {
        start: new Date('2024-05-30'),
      },
    ])
    component.control = control
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
