import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gn-ui-form-field-object',
  templateUrl: './form-field-object.component.html',
  styleUrls: ['./form-field-object.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormFieldObjectComponent {}
