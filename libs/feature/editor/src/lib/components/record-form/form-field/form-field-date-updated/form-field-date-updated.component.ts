import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatePickerComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-form-field-date-updated',
  templateUrl: './form-field-date-updated.component.html',
  styleUrls: ['./form-field-date-updated.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePickerComponent],
})
export class FormFieldDateUpdatedComponent {
  @Input() value: Date
  @Output() valueChange: EventEmitter<Date> = new EventEmitter()
}
