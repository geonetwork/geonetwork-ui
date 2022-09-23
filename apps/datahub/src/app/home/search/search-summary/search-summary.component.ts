import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { map, pluck } from 'rxjs/operators'

@Component({
  selector: 'datahub-search-summary',
  templateUrl: './search-summary.component.html',
  styleUrls: ['./search-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSummaryComponent {
  publisher$ = this.searchFacade.searchFilters$.pipe(
    pluck('OrgForResource'),
    map((orgState) => orgState && Object.keys(orgState)[0])
  )
  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  removeOrg() {
    this.searchService.updateSearch({
      OrgForResource: {},
    })
  }
}
