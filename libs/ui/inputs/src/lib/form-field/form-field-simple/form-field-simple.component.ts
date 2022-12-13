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
  @Input() invalid = false
  @Input() placeholder = ''
  @Input() options?: { label: string; value: unknown }[]

  get inputType() {
    switch (this.type) {
      case 'url':
      case 'text':
        return 'text'
      case 'date':
        return 'datetime-local'
      case 'number':
        return 'number'
      case 'toggle':
        return 'checkbox'
      default:
        return ''
    }
  }

  get isSelect() {
    return this.type === 'list'
  }
}
