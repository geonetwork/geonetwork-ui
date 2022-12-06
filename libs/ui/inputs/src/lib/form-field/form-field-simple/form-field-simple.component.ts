import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'gn-ui-form-field-simple',
  templateUrl: './form-field-simple.component.html',
  styleUrls: ['./form-field-simple.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldSimpleComponent {
  @Input() type: 'date' | 'url' | 'text' | 'number' | 'list' | 'toggle'
  @Input() control!: FormControl
  @Input() readonly = false
  @Input() options?: { label: string; value: unknown }[]
}
