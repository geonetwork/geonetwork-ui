import { Component, OnInit } from '@angular/core'
import { FacetSelectEvent, ModelBlock } from '@geonetwork-ui/ui/search'
import { combineLatest, Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { SearchFacade } from '../../state/search.facade'
import { FacetsService } from '../facets.service'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { EsRequestAggTerm } from '@geonetwork-ui/api/metadata-converter'

marker('facets.block.title.OrgForResource')
marker('facets.block.title.availableInServices')
marker('facets.block.title.cl_hierarchyLevel.key')
marker('facets.block.title.cl_maintenanceAndUpdateFrequency.key')
marker('facets.block.title.cl_spatialRepresentationType.key')
marker('facets.block.title.cl_status.key')
marker('facets.block.title.creationYearForResource')
marker('facets.block.title.resolutionScaleDenominator')
marker('facets.block.title.tag')
marker('facets.block.title.tag.default')
marker('facets.block.title.th_regions_tree.default')

@Component({
  selector: 'gn-ui-facets-container',
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

  private updateFilters(filters: FieldFilters, facetEvent: FacetSelectEvent) {
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
