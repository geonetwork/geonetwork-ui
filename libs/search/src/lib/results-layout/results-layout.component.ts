import { Component, OnInit } from '@angular/core'
import { ResultsListLayout } from '@lib/common'
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
  currentLayout$: Observable<string>

  constructor(private searchFacade: SearchFacade) {}

  ngOnInit(): void {
    this.currentLayout$ = this.searchFacade.layout$
  }

  change(layout: any) {
    this.searchFacade.setResultsLayout(layout)
  }
}
