import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormFieldTemporalExtentsComponent } from './form-field-temporal-extents.component'

describe('FormFieldTemporalExtentsComponent', () => {
  let component: FormFieldTemporalExtentsComponent
  let fixture: ComponentFixture<FormFieldTemporalExtentsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldTemporalExtentsComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldTemporalExtentsComponent)
    component = fixture.componentInstance
    component.extents = [
      {
        start: new Date('2024-05-24'),
        end: null,
      },
      {
        start: new Date('2024-05-30'),
      },
    ]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
