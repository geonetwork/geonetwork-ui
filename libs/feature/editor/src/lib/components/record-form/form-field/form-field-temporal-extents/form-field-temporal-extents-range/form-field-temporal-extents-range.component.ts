import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { DateRangePickerComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-form-field-temporal-extents-range',
  templateUrl: './form-field-temporal-extents-range.component.html',
  styleUrls: ['./form-field-temporal-extents-range.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DateRangePickerComponent, TranslateModule],
})
export class FormFieldTemporalExtentsRangeComponent {
  @Input() control!: FormControl
}
