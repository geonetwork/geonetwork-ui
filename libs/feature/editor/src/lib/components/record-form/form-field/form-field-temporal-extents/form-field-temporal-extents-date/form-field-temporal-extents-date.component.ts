import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { DatePickerComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-form-field-temporal-extents-date',
  templateUrl: './form-field-temporal-extents-date.component.html',
  styleUrls: ['./form-field-temporal-extents-date.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePickerComponent, TranslateModule],
})
export class FormFieldTemporalExtentsDateComponent {
  @Input() control!: FormControl
}
