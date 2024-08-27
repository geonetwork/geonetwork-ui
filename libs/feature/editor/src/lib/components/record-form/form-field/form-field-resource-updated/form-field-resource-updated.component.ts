import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatePickerComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-form-field-resource-updated',
  templateUrl: './form-field-resource-updated.component.html',
  styleUrls: ['./form-field-resource-updated.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePickerComponent],
})
export class FormFieldResourceUpdatedComponent {
  @Input() value: Date
  @Output() valueChange: EventEmitter<Date> = new EventEmitter()
}
