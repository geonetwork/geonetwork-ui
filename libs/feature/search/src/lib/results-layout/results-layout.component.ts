import { Component } from '@angular/core'
import { ResultsListLayout } from '@geonetwork-ui/util/shared'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'gn-ui-results-layout',
  templateUrl: './results-layout.component.html',
})
export class ResultsLayoutComponent {
  choices = Object.values(ResultsListLayout).map((v) => {
    return {
      label: v,
      value: v,
    }
  })

  constructor(public searchFacade: SearchFacade) {}

  change(layout: any) {
    this.searchFacade.setResultsLayout(layout)
  }
}
