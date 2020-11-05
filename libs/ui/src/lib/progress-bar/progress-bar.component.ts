import { Component, Input, OnInit } from '@angular/core'

interface ColorScheme {
  outerBar: string
  innerBar: string
}

@Component({
  selector: 'ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() value = 0
  @Input() type: 'primary' | 'secondary' | 'default' = 'default'

  get progress() {
    return this.value > 0 ? (this.value < 100 ? this.value : 100) : 0
  }

  get color(): ColorScheme {
    switch (this.type) {
      case 'default':
        return {
          outerBar: 'bg-blue-500',
          innerBar: 'bg-blue-300',
        }
      case 'primary':
        return {
          outerBar: 'bg-green-500',
          innerBar: 'bg-green-300',
        }
      case 'secondary':
        return {
          outerBar: 'bg-red-500',
          innerBar: 'bg-red-300',
        }
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
