import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { DateRangePickerComponent } from './date-range-picker.component'

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent
  let fixture: ComponentFixture<DateRangePickerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangePickerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DateRangePickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set start date on startDateSelected', () => {
    const event = {
      value: new Date('2023-01-01'),
    } as MatDatepickerInputEvent<Date>
    component.startDateSelected(event)
    expect(component.startDate).toEqual(new Date('2023-01-01'))
  })

  it('should set end date on endDateSelected', () => {
    const event = {
      value: new Date('2023-01-31'),
    } as MatDatepickerInputEvent<Date>
    component.endDateSelected(event)
    expect(component.endDate).toEqual(new Date('2023-01-31'))
  })
})
