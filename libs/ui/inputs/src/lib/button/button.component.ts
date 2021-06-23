import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'

@Component({
  selector: 'gn-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  @Input() type: 'primary' | 'secondary' | 'default' = 'default'
  @Input() disabled = false
  @Input() extraClass = ''

  classList = ''

  get color() {
    let classes = ''
    switch (this.type) {
      case 'default':
        classes = 'bg-gray-100 hover:bg-gray-200'
        break
      case 'primary':
        classes = 'bg-primary-lighter hover:bg-primary'
        break
      case 'secondary':
        classes = 'bg-secondary-lighter hover:bg-secondary'
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
        return 'text-main'
      case 'secondary':
        return 'text-secondary-darkest'
      case 'primary':
        return 'text-primary-darkest'
    }
  }

  get borderColor() {
    let classes = ''
    switch (this.type) {
      case 'default':
        classes =
          'border-gray-100 hover:border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50'
        break
      case 'secondary':
        classes =
          'border-secondary-lighter hover:border-secondary focus:border-secondary-darker focus:ring-4 focus:ring-secondary-darker focus:ring-opacity-50'
        break
      case 'primary':
        classes =
          'border-primary-lighter hover:border-primary focus:border-primary-darker focus:ring-4 focus:ring-primary-darker focus:ring-opacity-50'
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

  ngOnChanges(changes: SimpleChanges): void {
    this.classList = `${this.color} ${this.textColor} ${this.borderColor} ${this.extraClass}`
  }
}
