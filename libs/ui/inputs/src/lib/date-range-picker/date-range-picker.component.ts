import { Component } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'gn-ui-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  standalone: true,
  imports: [MatIconModule, MatNativeDateModule, MatDatepickerModule],
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
