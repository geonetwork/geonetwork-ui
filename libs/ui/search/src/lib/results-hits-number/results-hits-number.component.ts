import { Component, Input } from '@angular/core'

interface HitsNumberInput {
  value: number
}
@Component({
  selector: 'gn-ui-results-hits-number',
  templateUrl: './results-hits-number.component.html',
})
export class ResultsHitsNumberComponent {
  @Input() hits: HitsNumberInput
  @Input() loading: boolean
}
