import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { InfiniteScrollModel, MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'datahub-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}

  scrollableOptions: InfiniteScrollModel = {
    container: '#home-page',
    fromRoot: true,
  }

  ngOnInit() {
    this.searchFacade.setResultsLayout('DATAHUB')
  }

  onMetadataSelection(metadata: MetadataRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }

  resetSearch(): void {
    this.searchFacade.setFilters({})
  }
}
