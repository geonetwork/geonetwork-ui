import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'

marker('search.filter.hasSpatialRef')
marker('search.filter.hasNoSpatialRef')
marker('search.filter.all')

enum SpatialRefFilter {
  HAS_SPATIAL_REF = 'hasSpatialRef',
  NO_SPATIAL_REF = 'noSpatialRef',
  ALL = 'all',
}

@Component({
  selector: 'gn-ui-filter-spatialdata',
  templateUrl: './filter-spatialdata.component.html',
  styleUrls: ['./filter-spatialdata.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSpatialdataComponent {
  choices = [
    {
      label: 'search.filter.hasSpatialRef',
      value: SpatialRefFilter.HAS_SPATIAL_REF,
    },
    {
      label: 'search.filter.noSpatialRef',
      value: SpatialRefFilter.NO_SPATIAL_REF,
    },
    {
      label: 'search.filter.all',
      value: SpatialRefFilter.ALL,
    },
  ]
  currentFilter$ = of(SpatialRefFilter.ALL)

  constructor(
    private facade: SearchFacade,
    private searchService: SearchService
  ) {}

  changeFilterBySpatialRef(filter: SpatialRefFilter) {
    let params = { format: {} }
    //TODO: need to be generated dynamically via AggregationService
    const formatsSpatial = ['geojson', 'geopackage']
    const formatsNonSpatial = ['json', 'csv']
    switch (filter) {
      case SpatialRefFilter.ALL:
        break
      case SpatialRefFilter.HAS_SPATIAL_REF:
        params = {
          ...params,
          format: this.toParamsObject(formatsSpatial),
        }
        break
      case SpatialRefFilter.NO_SPATIAL_REF:
        params = {
          ...params,
          format: this.toParamsObject(formatsNonSpatial),
        }
        break
    }
    this.searchService.updateFilters(params)
  }

  toParamsObject(params: string[]) {
    return params.reduce<Record<string, boolean>>((acc, val) => {
      return { ...acc, [val.toString()]: true }
    }, {})
  }
}
