import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { SearchState } from '../../state/reducer'
import { getSearchAggregations } from '../../state/selectors'
import { FacetsService } from '../facets.service'

@Component({
  selector: 'search-facets-container',
  templateUrl: './facets-container.component.html',
  styleUrls: ['./facets-container.component.css'],
})
export class FacetsContainerComponent implements OnInit {
  @Input() uiConfig = 'srv'

  // TODO: fixture
  requestAggregations = {
    tag: { terms: { field: 'tag', include: '.*', size: 10 } },
  }

  models$ = this.store.pipe(
    select(getSearchAggregations),
    map((responseAggregations: any) => {
      return this.facets.createFacetModel(
        this.requestAggregations,
        responseAggregations,
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
