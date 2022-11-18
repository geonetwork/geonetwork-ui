import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { getLinkType } from '@geonetwork-ui/feature/search'
import { map, pluck } from 'rxjs/operators'

@Component({
  selector: 'datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent {
  publisher$ = this.searchFacade.searchFilters$.pipe(
    pluck('OrgForResource'),
    map((orgState) => orgState && Object.keys(orgState)[0])
  )
  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  isOpen = false

  formatLabelFactory(bucketKey: string) {
    const formatTypes = [
      'WMS',
      'WMTS',
      'WFS',
      'ESRI REST',
      'DOWNLOAD',
      'LANDING PAGE',
      'OTHER',
    ]
    return `${formatTypes[getLinkType('', bucketKey)]}`
  }

  formatGroupFactory(selectOptions: any) {
    const groupedOptions = groupBy(selectOptions, 'label')
    const groupedOptionsSum = []
    if (groupedOptions) {
      Object.entries(groupedOptions).forEach((group: any) => {
        const option = group[1].reduce((group: any, item: any) => ({
          ...group,
          value:
            group.value instanceof Array
              ? [...group.value, item.value]
              : [group.value],
          count: group.count + item.count,
        }))
        groupedOptionsSum.push({
          ...option,
          label: `${option.label} (${option.count})`,
        })
      })
    }
    return groupedOptionsSum
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

  removeOrg() {
    this.searchService.updateSearch({
      OrgForResource: {},
    })
  }
}

function groupBy(list, key) {
  return list
    ? list.reduce(
        (groups, item) => ({
          ...groups,
          [item[key]]: [...(groups[item[key]] || []), item],
        }),
        {}
      )
    : list
}
