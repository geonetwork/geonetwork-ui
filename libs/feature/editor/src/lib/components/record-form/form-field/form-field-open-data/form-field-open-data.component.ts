import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { OPEN_DATA_LICENSES } from './../../../../fields.config'
import { Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-form-field-open-data',
  templateUrl: './form-field-open-data.component.html',
  styleUrls: ['./form-field-open-data.component.css'],
  standalone: true,
  imports: [CheckToggleComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldOpenDataComponent implements OnInit {
  @Input() control: FormControl
  value = false
  @Output() visibilityChange = new EventEmitter<boolean>()
  subscription: Subscription

  get config() {
    return OPEN_DATA_LICENSES
  }

  ngOnInit() {
    this.initToggle()
    this.subscription = new Subscription()

    this.subscription.add(
      this.control.valueChanges.subscribe((value) => {
        this.value = this.config.includes(value[0].text)
        this.visibilityChange.emit(this.value)
      })
    )
  }

  initToggle() {
    this.value = this.config.includes(this.control.value[0].text)
    this.visibilityChange.emit(this.value)
  }

  onOpenDataToggled(boolean) {
    if (boolean) {
      this.control.setValue([{ text: this.config[0] }])
    }
    this.value = !this.value
    this.visibilityChange.emit(boolean)
  }
}
