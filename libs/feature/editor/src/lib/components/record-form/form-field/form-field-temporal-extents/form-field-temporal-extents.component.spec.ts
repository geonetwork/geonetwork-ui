import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormFieldTemporalExtentsComponent } from './form-field-temporal-extents.component'
import { FormControl } from '@angular/forms'

describe('FormFieldTemporalExtentsComponent', () => {
  let component: FormFieldTemporalExtentsComponent
  let fixture: ComponentFixture<FormFieldTemporalExtentsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldTemporalExtentsComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldTemporalExtentsComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue([
      {
        start: new Date('2024-05-24'),
        end: null,
      },
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
