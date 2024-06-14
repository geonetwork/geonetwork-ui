import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'gn-ui-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, MatNativeDateModule, MatDatepickerModule],
})
export class DateRangePickerComponent {
  @Input() startDate: Date
  @Input() endDate: Date
  @Output() startDateChange = new EventEmitter<Date>()
  @Output() endDateChange = new EventEmitter<Date>()
}
