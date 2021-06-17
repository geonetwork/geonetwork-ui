import { Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-results-hits-number',
  templateUrl: './results-hits-number.component.html',
})
export class ResultsHitsNumberComponent {
  @Input() hits
  @Input() loading: boolean
}
