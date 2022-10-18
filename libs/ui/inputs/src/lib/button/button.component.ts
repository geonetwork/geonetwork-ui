import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'default' | 'outline' = 'default'
  @Input() disabled = false
  @Input() extraClass = ''

  get classList() {
    return `${this.color} ${this.textColor} ${this.borderColor} ${this.extraClass}`
  }

  get color() {
    let classes = ''
    switch (this.type) {
      case 'default':
        classes =
          'bg-gray-700 hover:bg-gray-800 hover:bg-gray-800 active:bg-gray-900'
        break
      case 'primary':
        classes =
          'bg-primary-darker hover:bg-primary-darkest focus:bg-primary-darkest active:bg-primary-black'
        break
      case 'secondary':
        classes =
          'bg-secondary-darker hover:bg-secondary-darkest focus:bg-secondary-darkest active:bg-secondary-black'
        break
      case 'outline':
        classes = 'bg-white'
        break
    }
    if (this.disabled) {
      classes = [
        classes.split(' ').filter((cls) => !cls.startsWith('hover:')),
        'disabled:opacity-50',
        'cursor-auto',
      ].join(' ')
    }
    return classes
  }

  get textColor() {
    switch (this.type) {
      case 'default':
      case 'secondary':
      case 'primary':
        return 'text-white'
      case 'outline':
        return 'text-main hover:text-primary-darker focus:text-primary-darker active:text-primary-black'
    }
  }

  get borderColor() {
    let classes = ''
    switch (this.type) {
      case 'default':
        classes = 'focus:ring-4 focus:ring-gray-200'
        break
      case 'secondary':
        classes = 'focus:ring-4 focus:ring-secondary-lightest'
        break
      case 'primary':
        classes = 'focus:ring-4 focus:ring-primary-lightest'
        break
      case 'outline':
        classes =
          'border border-gray-300 hover:border-primary-lighter focus:border-primary-lighter focus:ring-4 focus:ring-primary-lightest active:border-primary-darker'
        break
    }
    if (this.disabled) {
      classes = classes
        .split(' ')
        .filter((cls) => !cls.startsWith('hover:'))
        .join(' ')
    }
    return classes
  }
}
