import { Component, Inject } from '@angular/core'
import {
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigModel,
} from '@geonetwork-ui/ui/search'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'gn-ui-results-layout',
  templateUrl: './results-layout.component.html',
})
export class ResultsLayoutComponent {
  choices = Object.keys(this.resultsLayoutConfig).map((v) => {
    return {
      label: v,
      value: v,
    }
  })

  constructor(
    public searchFacade: SearchFacade,
    @Inject(RESULTS_LAYOUT_CONFIG)
    private resultsLayoutConfig: ResultsLayoutConfigModel
  ) {}

  change(layout: string) {
    this.searchFacade.setResultsLayout(layout)
  }
}
