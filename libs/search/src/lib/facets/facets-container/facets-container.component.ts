import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { SearchState } from '../../state/reducer'
import {
  getSearchConfigAggregations,
  getSearchResultsAggregations,
} from '../../state/selectors'
import { FacetsService } from '../facets.service'

@Component({
  selector: 'search-facets-container',
  templateUrl: './facets-container.component.html',
  styleUrls: ['./facets-container.component.css'],
})
export class FacetsContainerComponent implements OnInit {
  @Input() uiConfig = 'srv'

  models$ = combineLatest([
    this.store.select(getSearchConfigAggregations),
    this.store.select(getSearchResultsAggregations),
  ]).pipe(
    map(([configAggregations, resultsAggregations]) => {
      return this.facets.createFacetModel(
        configAggregations,
        resultsAggregations,
        false
      )
    })
  )

  constructor(
    private store: Store<SearchState>,
    private facets: FacetsService
  ) {}

  ngOnInit(): void {}
}
