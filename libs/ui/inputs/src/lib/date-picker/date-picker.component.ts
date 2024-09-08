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
import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'gn-ui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ButtonComponent,
  ],
})
export class DatePickerComponent {
  @Input() date: Date
  @Output() dateChange = new EventEmitter<Date>()
}
