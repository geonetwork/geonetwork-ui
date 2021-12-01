import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

marker('datahub.header.myfavorites')
marker('datahub.header.connex')
marker('datahub.header.lastRecords')
marker('datahub.header.popularRecords')

@Component({
  selector: 'datahub-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  autocompleteDisplayWithFn = () => ''

  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}

  onFuzzySearchSelection(record: MetadataRecord) {
    this.searchRouter.goToMetadata(record)
  }

  onFuzzySearchSubmission() {
    this.searchRouter.goToSearch()
  }

  onDatasetClick(): void {
    this.searchRouter.goToSearch()
    this.resetSearch()
  }

  private resetSearch(): void {
    this.searchFacade.setFilters({})
  }
}
