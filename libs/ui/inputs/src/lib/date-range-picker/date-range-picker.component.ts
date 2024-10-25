import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ButtonComponent } from '../button/button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirCalendar } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ iconoirCalendar }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class DateRangePickerComponent {
  @Input() startDate: Date
  @Input() endDate: Date
  @Output() startDateChange = new EventEmitter<Date>()
  @Output() endDateChange = new EventEmitter<Date>()
}
