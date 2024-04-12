import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gn-ui-form-field-array',
  templateUrl: './form-field-array.component.html',
  styleUrls: ['./form-field-array.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormFieldArrayComponent {}
