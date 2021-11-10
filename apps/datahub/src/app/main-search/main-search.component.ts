import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade, SearchFacade } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSearchComponent implements OnInit {
  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit() {
    this.searchFacade
      .setFilters({
        any: '',
      })
      .setResultsLayout('DATAHUB')
  }

  onMetadataSelection(metadata: MetadataRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
