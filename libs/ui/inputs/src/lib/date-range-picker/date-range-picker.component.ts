import { Component } from '@angular/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'

@Component({
  selector: 'gn-ui-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
})
export class DateRangePickerComponent {
  startDate: Date
  endDate: Date

  startDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value
  }

  endDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value
  }
}
