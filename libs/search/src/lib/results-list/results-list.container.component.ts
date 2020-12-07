import { Component, Input, OnInit } from '@angular/core'
import { BootstrapService, ResultsListLayout } from '@lib/common'
import { select, Store } from '@ngrx/store'
import { SearchState } from '../state/reducer'
import {
  getSearchResults,
  getSearchResultsLayout,
  getSearchResultsLoading,
} from '../state/selectors'
import {
  RequestMoreResults,
  SetConfigAggregations,
  UpdateFilters,
} from '../state/actions'
import { map, pluck, take, tap } from 'rxjs/operators'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD

  results$ = this.store.pipe(select(getSearchResults))
  layout$ = this.store.pipe(select(getSearchResultsLayout))
  isLoading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(
    private bootstrap: BootstrapService,
    private store: Store<SearchState>
  ) {}

  ngOnInit(): void {
    // initial load when showing the component

    this.bootstrap
      .uiConfReady('srv')
      .pipe(
        take(1),
        map((config) => config.mods.search.facetConfig),
        // TODO: make the config work not just for tag
        pluck('tag'),
        tap((tagConfig) => {
          this.store.dispatch(new SetConfigAggregations({ tag: tagConfig }))
          this.store.dispatch(new RequestMoreResults())
        })
      )
      .subscribe()
  }
}
