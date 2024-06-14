import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormFieldTemporalExtentsRangeComponent } from './form-field-temporal-extents-range.component'
import { FormControl } from '@angular/forms'

describe('FormFieldTemporalExtentsRangeComponent', () => {
  let component: FormFieldTemporalExtentsRangeComponent
  let fixture: ComponentFixture<FormFieldTemporalExtentsRangeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldTemporalExtentsRangeComponent,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldTemporalExtentsRangeComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue([
      {
        start: new Date('2024-05-24'),
        end: null,
      },
    ])
    component.control = control
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
