import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

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
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
})
export class SwitchToggleComponent {
  @Input() options: SwitchToggleOption[]
  @Input() ariaLabel? = ''
  @Input() extraClasses? = ''
  @Output() selectedValue = new EventEmitter<SwitchToggleOption>()

  onChange(selectedOption: SwitchToggleOption) {
    this.options.find(
      (option) => option.value === selectedOption.value
    ).checked = true

    this.selectedValue.emit(selectedOption)
  }
}
