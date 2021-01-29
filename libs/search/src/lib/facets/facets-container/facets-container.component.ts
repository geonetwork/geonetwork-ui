import { Component, OnInit } from '@angular/core'
import { EsRequestAggTerm, SearchFilters } from '@lib/common'
import { FacetSelectEvent, ModelBlock } from '@lib/ui'
import { combineLatest, Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { SearchFacade } from '../../state/search.facade'
import { FacetsService } from '../facets.service'

@Component({
  selector: 'search-facets-container',
  templateUrl: './facets-container.component.html',
  styleUrls: ['./facets-container.component.css'],
})
export class FacetsContainerComponent implements OnInit {
  selectedPaths$: Observable<string[][]>
  models$: Observable<ModelBlock[]>

  constructor(
    private facets: FacetsService,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.selectedPaths$ = this.searchFacade.searchFilters$.pipe(
      map((filters) => this.facets.findSelectedPaths(filters))
    )

    this.models$ = combineLatest([
      this.searchFacade.configAggregations$,
      this.searchFacade.resultsAggregations$,
    ]).pipe(
      map(([configAggregations, resultsAggregations]) => {
        const model = this.facets.createFacetModel(
          configAggregations,
          resultsAggregations,
          false
        )
        return model
      })
    )
  }

  onItemChange(facetEvent: FacetSelectEvent) {
    this.searchFacade.searchFilters$.pipe(take(1)).subscribe((filters) => {
      this.updateFilters(filters, facetEvent)
    })
  }

  private updateFilters(filters: SearchFilters, facetEvent: FacetSelectEvent) {
    const { item, block } = facetEvent
    const { path } = item
    const pathValue = this.facets.computeItemPathValue(block, item)
    const newFilters = this.facets.computeNewFiltersFromState(
      filters,
      path,
      pathValue
    )
    this.searchFacade.setFilters(newFilters)
  }

  onMore(key: string): void {
    this.searchFacade.requestMoreOnAggregation(key, 20)
  }

  onFilterChange(term: EsRequestAggTerm): void {
    const include = `.*${term.include}.*`
    this.searchFacade.setIncludeOnAggregation(term.field, include)
  }
}
