import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatePickerComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-form-field-date',
  templateUrl: './form-field-date.component.html',
  styleUrls: ['./form-field-date.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePickerComponent],
})
export class FormFieldDateComponent {
  @Input() value: Date
  @Output() valueChange: EventEmitter<Date> = new EventEmitter()
}
