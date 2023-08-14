import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { propagateToDocumentOnly } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'default' | 'outline' | 'light' =
    'default'
  @Input() disabled = false
  @Input() extraClass = ''
  @Output() buttonClick = new EventEmitter<void>()

  get classList() {
    return `${this.color} ${this.textColor} ${this.borderColor} ${this.extraClass}`
  }

  get color() {
    switch (this.type) {
      case 'default':
        return 'bg-gray-700 hover:bg-gray-800 hover:bg-gray-800 active:bg-gray-900'
      case 'primary':
        return 'bg-primary hover:bg-primary-darker focus:bg-primary-darker active:bg-primary-darkest'
      case 'secondary':
        return 'bg-secondary hover:bg-secondary-darker focus:bg-secondary-darker active:bg-secondary-darkest'
      case 'outline':
        return 'bg-white'
      case 'light':
        return 'bg-white hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-100'
    }
  }

  get textColor() {
    switch (this.type) {
      case 'default':
      case 'secondary':
      case 'primary':
        return 'text-white'
      case 'outline':
        return 'text-main hover:text-primary-darker focus:text-primary-darker active:text-primary-black'
      case 'light':
        return 'text-main'
    }
  }

  get borderColor() {
    switch (this.type) {
      case 'default':
        return 'focus:ring-4 focus:ring-gray-200'
      case 'secondary':
        return 'focus:ring-4 focus:ring-secondary-lightest'
      case 'primary':
        return 'focus:ring-4 focus:ring-primary-lightest'
      case 'outline':
        return 'border border-gray-300 hover:border-primary-lighter focus:border-primary-lighter focus:ring-4 focus:ring-primary-lightest active:border-primary-darker'
      case 'light':
        return 'focus:ring-4 focus:ring-gray-300'
    }
  }

  handleClick(event: Event) {
    this.buttonClick.emit()
    event.preventDefault()
    propagateToDocumentOnly(event)
  }
}
