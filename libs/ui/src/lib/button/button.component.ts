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
        return 'orange-100'
      case 'primary':
        return 'blue-500'
      case 'secondary':
        return 'indigo-200'
    }
  }

  get hoverColor() {
    switch (this.type) {
      case 'default':
        return 'orange-200'
      case 'primary':
        return 'blue-600'
      case 'secondary':
        return 'indigo-300'
    }
  }

  get textColor() {
    switch (this.type) {
      case 'default':
      case 'secondary':
        return 'black'
      case 'primary':
        return 'white'
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
