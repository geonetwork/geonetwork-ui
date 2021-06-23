import { Component } from '@angular/core'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'gn-ui-results-hits',
  templateUrl: './results-hits.container.component.html',
})
export class ResultsHitsContainerComponent {
  constructor(public facade: SearchFacade) {}
}
