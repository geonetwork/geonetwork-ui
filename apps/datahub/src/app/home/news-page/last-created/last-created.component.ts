import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ES_SOURCE_BRIEF, MetadataRecord } from '@geonetwork-ui/util/shared'
import {
  RecordPreviewFeedComponent,
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigItem,
} from '@geonetwork-ui/ui/search'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'datahub-last-created',
  templateUrl: './last-created.component.html',
  styleUrls: ['./last-created.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastCreatedComponent {
  constructor(
    private searchFacade: SearchFacade,
    private routerFacade: RouterFacade
  ) {
    this.searchFacade.init('newsfeed') // init the search state manually
    this.searchFacade.setConfigRequestFields({
      includes: [...ES_SOURCE_BRIEF, 'createDate', 'changeDate'],
    })
    this.searchFacade.setPagination(0, 10)
    this.searchFacade.setSortBy('-createDate')
    this.searchFacade.setResultsLayout('FEED')
  }

  onMetadataSelection(metadata: MetadataRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
