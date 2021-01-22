import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'

interface ColorScheme {
  outerBar: string
  innerBar: string
}

@Component({
  selector: 'ui-step-bar',
  templateUrl: './step-bar.component.html',
  styleUrls: ['./step-bar.component.css'],
})
export class StepBarComponent implements OnInit {
  @Input() steps
  @Input() currentStep = 1
  @Input() type: 'primary' | 'secondary' | 'default' = 'default'

  constructor(private cdr: ChangeDetectorRef) {}

  get stepCounter() {
    return new Array(this.steps)
  }

  get color(): ColorScheme {
    switch (this.type) {
      case 'default':
        return {
          outerBar: 'bg-gray-200',
          innerBar: 'bg-gray-100',
        }
      case 'primary':
        return {
          outerBar: 'bg-primary',
          innerBar: 'bg-primary-lighter',
        }
      case 'secondary':
        return {
          outerBar: 'bg-secondary',
          innerBar: 'bg-secondary-lighter',
        }
    }
  }

  ngOnInit(): void {}

  getCircleColor(index: number): string {
    return index === this.currentStep
      ? 'bg-black'
      : index < this.currentStep
      ? this.color.innerBar
      : 'bg-white'
  }
}
