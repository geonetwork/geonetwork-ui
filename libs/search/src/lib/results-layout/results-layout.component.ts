import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { UpdateResultsLayout } from '../state/actions'
import { SearchState } from '../state/reducer'
import { getSearchResultsLayout } from '../state/selectors'
import { ResultsListLayout } from '@lib/common'

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
  currentLayout$ = this.store.pipe(select(getSearchResultsLayout))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {}

  change(layout: any) {
    this.store.dispatch(new UpdateResultsLayout(layout))
  }
}
