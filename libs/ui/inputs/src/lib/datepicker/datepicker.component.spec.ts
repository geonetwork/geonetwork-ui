import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DatepickerComponent } from '@geonetwork-ui/ui/inputs'
import { AngularMyDatePickerModule } from 'angular-mydatepicker'

describe('DatepickerComponent', () => {
  let component: DatepickerComponent
  let fixture: ComponentFixture<DatepickerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      imports: [AngularMyDatePickerModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
