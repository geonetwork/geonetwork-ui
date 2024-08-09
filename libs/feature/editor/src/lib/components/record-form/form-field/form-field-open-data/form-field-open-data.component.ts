import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-form-field-open-data',
  templateUrl: './form-field-open-data.component.html',
  styleUrls: ['./form-field-open-data.component.css'],
  standalone: true,
  imports: [CheckToggleComponent, TranslateModule],
})
export class FormFieldOpenDataComponent implements OnChanges {
  @Input() control: FormControl
  value = false
  @Output() visibilityChange = new EventEmitter<boolean>()

  get config() {
    return getGlobalConfig().LICENSES
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('control' in changes) {
      this.value = this.config.includes(this.control.value[0].text)
      this.visibilityChange.emit(this.value)
    }
  }

  onOpenDataToggled(boolean) {
    if (boolean) {
      this.control.setValue([{ text: this.config[0] }])
    }
    this.visibilityChange.emit(boolean)
  }
}
