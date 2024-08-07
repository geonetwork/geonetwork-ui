import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-check-toggle',
  templateUrl: './check-toggle.component.html',
  styleUrls: ['./check-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
})
export class CheckToggleComponent {
  @Input() title: string
  @Input() label: string
  @Input() config: any
  @Input() value: any
  // @Input() set value(v) {
  //   if (Array.isArray(v)) {
  //     let isOpenData = false
  //     if (v[0] && v[0].text) {
  //       console.log(this.config)
  //       isOpenData = this.config.includes(v[0].text)
  //     }
  //     this.checked = isOpenData
  //     this.toggled.emit(isOpenData)
  //   } else {
  //     this.checked = v
  //   }
  // }
  @Input() color: 'primary' | 'secondary' = 'primary'
  @Input() model: string
  @Output() toggled = new EventEmitter()
  checked = false

  ngOnChanges(changes: SimpleChanges) {
    if (
      'value' in changes &&
      'config' in changes &&
      Array.isArray(this.value)
    ) {
      let isOpenData = false
      if (this.value[0] && this.value[0].text) {
        console.log(this.config)
        isOpenData = this.config.includes(this.value[0].text)
      }
      this.checked = isOpenData
      this.toggled.emit(isOpenData)
    } else if ('value' in changes) {
      this.checked = this.value
    }
  }

  toggle(event: boolean) {
    let isHidden = false
    let value = []
    if (this.model === 'licenses') {
      if (event) {
        // TODO : empty the constraints field and hide the field
        isHidden = true
        if (this.model === 'licenses') value = [{ text: this.config[0] }]
      } else {
        // TODO : show the constraints field
        isHidden = false
      }
      this.toggled.emit([isHidden, value])
    } else {
      this.toggled.emit(event)
    }
  }
}
