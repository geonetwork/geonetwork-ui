import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DatepickerComponent } from '@lib/ui'
import { MyDatePickerModule } from 'mydatepicker'

describe('DatepickerComponent', () => {
  let component: DatepickerComponent
  let fixture: ComponentFixture<DatepickerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      imports: [MyDatePickerModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
