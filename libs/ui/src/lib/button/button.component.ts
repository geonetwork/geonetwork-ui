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
        return 'button-default'
      case 'primary':
        return 'button-primary'
      case 'secondary':
        return 'button-secondary'
    }
  }

  get hoverColor() {
    switch (this.type) {
      case 'default':
        return 'button-default-hover'
      case 'primary':
        return 'button-primary-hover'
      case 'secondary':
        return 'button-secondary-hover'
    }
  }

  get textColor() {
    switch (this.type) {
      case 'default':
        return 'button-text-default-hover'
      case 'secondary':
        return 'button-text-secondary-hover'
      case 'primary':
        return 'button-text-primary'
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
