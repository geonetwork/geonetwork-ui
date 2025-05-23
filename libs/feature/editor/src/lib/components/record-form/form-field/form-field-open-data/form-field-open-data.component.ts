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
import { TranslatePipe } from '@ngx-translate/core'
import { OPEN_DATA_LICENSE } from './../../../../fields.config'

@Component({
  selector: 'gn-ui-form-field-open-data',
  templateUrl: './form-field-open-data.component.html',
  styleUrls: ['./form-field-open-data.component.css'],
  standalone: true,
  imports: [CheckToggleComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldOpenDataComponent implements OnChanges {
  @Input() value: Array<Constraint>
  @Output() valueChange = new EventEmitter<Array<Constraint>>()
  @Output() openDataChange = new EventEmitter<boolean>()

  get isOpenDataLicense(): boolean {
    return !!this.value.find(
      (constraint) => constraint.text === OPEN_DATA_LICENSE
    )
  }

  ngOnChanges() {
    this.openDataChange.emit(this.isOpenDataLicense)
  }

  onOpenDataToggled(openData: boolean) {
    this.openDataChange.emit(openData)
    if (openData) {
      this.valueChange.emit([
        {
          text: OPEN_DATA_LICENSE,
        },
      ])
    } else {
      this.valueChange.emit(
        this.value.filter((constraint) => constraint.text !== OPEN_DATA_LICENSE)
      )
    }
  }
}
