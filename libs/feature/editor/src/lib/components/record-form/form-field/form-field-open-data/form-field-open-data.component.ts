import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core'
import { Constraint } from '@geonetwork-ui/common/domain/model/record'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { OPEN_DATA_LICENSES } from './../../../../fields.config'

@Component({
  selector: 'gn-ui-form-field-open-data',
  templateUrl: './form-field-open-data.component.html',
  styleUrls: ['./form-field-open-data.component.css'],
  standalone: true,
  imports: [CheckToggleComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldOpenDataComponent implements OnChanges {
  @Input() value: Array<Constraint>
  @Output() valueChange = new EventEmitter<Array<Constraint>>()
  @Output() openDataChange = new EventEmitter<boolean>()

  openData = false

  get config() {
    return OPEN_DATA_LICENSES
  }

  ngOnChanges() {
    if (this.value && this.value.length > 0) {
      this.openData = this.config.includes(this.value[0].text)
    } else {
      this.openData = false
    }
    this.openDataChange.emit(this.openData)
  }

  onOpenDataToggled(openData: boolean) {
    this.openDataChange.emit(openData)
    if (openData) {
      this.valueChange.emit([{ text: this.config[0] }])
    }
  }
}
