import { Component, OnInit } from '@angular/core'
import { ResultsListLayout } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'search-results-layout',
  templateUrl: './results-layout.component.html',
})
export class ResultsLayoutComponent implements OnInit {
  choices = Object.values(ResultsListLayout).map((v) => {
    return {
      label: v,
      value: v,
    }
  })

  constructor(public searchFacade: SearchFacade) {}

  ngOnInit(): void {}

  change(layout: any) {
    this.searchFacade.setResultsLayout(layout)
  }
}
