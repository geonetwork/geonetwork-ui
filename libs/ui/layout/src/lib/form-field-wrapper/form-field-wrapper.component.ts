import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html',
  styleUrls: ['./form-field-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, CommonModule],
})
export class FormFieldWrapperComponent {
  @Input() label?: string
  @Input() hint?: string
}
