import { Component, Input } from '@angular/core'
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common'

interface ColorScheme {
  outerBar: string
  innerBar: string
  text: string
}

@Component({
  selector: 'gn-ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
})
export class ProgressBarComponent {
  @Input() value = 0
  @Input() type: 'primary' | 'secondary' | 'default' | 'light' = 'default'

  get progress() {
    return this.value > 0 ? (this.value < 100 ? this.value : 100) : 0
  }

  get color(): ColorScheme {
    switch (this.type) {
      case 'default':
        return {
          outerBar: 'bg-gray-200',
          innerBar: 'bg-gray-100',
          text: 'text-gray-900',
        }
      case 'primary':
        return {
          outerBar: 'bg-primary',
          innerBar: 'bg-primary-lighter',
          text: 'text-white',
        }
      case 'secondary':
        return {
          outerBar: 'bg-secondary',
          innerBar: 'bg-secondary-lighter',
          text: 'text-white',
        }
      case 'light':
        return {
          outerBar: 'bg-primary-white',
          innerBar: 'bg-primary',
          text: 'text-main',
        }
    }
  }
}
