import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'gn-ui-form-field-rich',
  templateUrl: './form-field-rich.component.html',
  styleUrls: ['./form-field-rich.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldRichComponent {
  @Input() control!: FormControl
  @Input() readonly = false
  @Input() invalid = false
  @Input() placeholder = ''
}
