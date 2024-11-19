import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-form-field-simple',
  templateUrl: './form-field-simple.component.html',
  styleUrls: ['./form-field-simple.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FormFieldSimpleComponent {
  @Input() type: 'text' | 'number'
  @Input() readonly = false
  @Input() invalid = false
  @Input() placeholder = ''
  @Input() value: unknown

  @Output() valueChange: EventEmitter<unknown> = new EventEmitter()
}
