import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-form-field-rich',
  templateUrl: './form-field-rich.component.html',
  styleUrls: ['./form-field-rich.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormFieldRichComponent {
  @Input() control!: FormControl
  @Input() readonly = false
  @Input() invalid = false
  @Input() placeholder = ''
}
