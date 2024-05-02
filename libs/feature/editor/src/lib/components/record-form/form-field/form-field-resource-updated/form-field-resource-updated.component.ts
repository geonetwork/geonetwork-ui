import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
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
  @Input() control!: FormControl
}
