import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'gn-ui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  standalone: true,
  imports: [MatIconModule, MatNativeDateModule, MatDatepickerModule],
})
export class DatePickerComponent {
  @Input() date: Date
  @Output() dateChange = new EventEmitter<Date>()
}
