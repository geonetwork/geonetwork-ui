import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-form-field-file',
  templateUrl: './form-field-file.component.html',
  styleUrls: ['./form-field-file.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormFieldFileComponent {
  @Input() control!: FormControl
  @Input() readonly = false
  @Input() invalid = false
  @Input() placeholder = ''
}
