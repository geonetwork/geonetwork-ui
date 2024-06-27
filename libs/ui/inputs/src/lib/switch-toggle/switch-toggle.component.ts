import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

export type SwitchToggleOption = {
  label: string
  value: string
  checked: boolean
}

@Component({
  selector: 'gn-ui-switch-toggle',
  templateUrl: './switch-toggle.component.html',
  styleUrls: ['./switch-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchToggleComponent {
  @Input() options: SwitchToggleOption[]
  @Input() ariaLabel? = ''
  @Input() extraClasses? = ''
  @Output() selectedValue = new EventEmitter<SwitchToggleOption>()

  onChange(selectedOption: SwitchToggleOption) {
    this.options.forEach((option) => {
      if (option.value === selectedOption.value) {
        option.checked = true
      } else {
        option.checked = false
      }
    })
    this.selectedValue.emit(selectedOption)
  }
}
