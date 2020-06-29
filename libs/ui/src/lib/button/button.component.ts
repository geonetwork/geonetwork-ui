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
        return 'bg-button-default'
      case 'primary':
        return 'bg-button-primary'
      case 'secondary':
        return 'bg-button-secondary'
    }
  }

  get hoverColor() {
    switch (this.type) {
      case 'default':
        return 'hover:bg-button-default-hover'
      case 'primary':
        return 'hover:bg-button-primary-hover'
      case 'secondary':
        return 'hover:bg-button-secondary-hover'
    }
  }

  get textColor() {
    switch (this.type) {
      case 'default':
        return 'text-button-text-default-hover'
      case 'secondary':
        return 'text-button-text-secondary-hover'
      case 'primary':
        return 'text-button-text-primary'
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
