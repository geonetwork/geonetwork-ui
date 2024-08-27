import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'gn-ui-form-field-simple',
  templateUrl: './form-field-simple.component.html',
  styleUrls: ['./form-field-simple.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class FormFieldSimpleComponent {
  @Input() type: 'date' | 'url' | 'text' | 'number' | 'list' | 'toggle'
  @Input() readonly = false
  @Input() invalid = false
  @Input() placeholder = ''
  @Input() options?: { label: string; value: unknown }[]
  @Input() value: unknown

  @Output() valueChange: EventEmitter<unknown> = new EventEmitter()

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
