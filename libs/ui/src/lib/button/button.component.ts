import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() type: 'primary' | 'secondary' | 'default' = 'default'

  get color() {
    switch (this.type) {
      case 'default':
        return 'bg-gray-100 hover:bg-gray-200'
      case 'primary':
        return 'bg-primary-lighter hover:bg-primary'
      case 'secondary':
        return 'bg-secondary-lighter hover:bg-secondary'
    }
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
    switch (this.type) {
      case 'default':
        return 'border-gray-100 hover:border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50'
      case 'secondary':
        return 'border-secondary-lighter hover:border-secondary focus:border-secondary-darker focus:ring-4 focus:ring-secondary-darker focus:ring-opacity-50'
      case 'primary':
        return 'border-primary-lighter hover:border-primary focus:border-primary-darker focus:ring-4 focus:ring-primary-darker focus:ring-opacity-50'
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
