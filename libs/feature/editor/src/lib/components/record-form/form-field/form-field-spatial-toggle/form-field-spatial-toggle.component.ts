import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gn-ui-form-field-spatial-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field-spatial-toggle.component.html',
  styleUrls: ['./form-field-spatial-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldSpatialToggleComponent {

}
