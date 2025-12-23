import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatePickerComponent } from '../date-picker/date-picker.component.js'
import { DatasetTemporalExtent } from '@geonetwork-ui/common/domain/model/record/metadata.model.js'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-date-range-inputs',
  standalone: true,
  imports: [TranslateDirective, DatePickerComponent],
  templateUrl: './date-range-inputs.component.html',
  styleUrl: './date-range-inputs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeInputsComponent {
  @Input() temporalExtent: DatasetTemporalExtent | null
  @Output() temporalExtentChange =
    new EventEmitter<DatasetTemporalExtent | null>()

  onStartDateChange(date: Date) {
    this.temporalExtent = {
      ...this.temporalExtent,
      start: date,
    }
    this.temporalExtentChange.emit(this.temporalExtent)
  }

  onEndDateChange(date: Date) {
    this.temporalExtent = {
      ...this.temporalExtent,
      end: date,
    }
    this.temporalExtentChange.emit(this.temporalExtent)
  }
}
