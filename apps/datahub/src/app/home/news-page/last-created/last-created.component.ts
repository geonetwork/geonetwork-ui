import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ES_SOURCE_BRIEF, MetadataRecord } from '@geonetwork-ui/util/shared'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'datahub-last-created',
  templateUrl: './last-created.component.html',
  styleUrls: ['./last-created.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastCreatedComponent implements OnInit {
  constructor(
    private searchFacade: SearchFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.searchFacade
      .setConfigRequestFields({
        includes: [...ES_SOURCE_BRIEF, 'createDate', 'changeDate'],
      })
      .setPagination(0, 10)
      .setSortBy('-createDate')
      .setResultsLayout('FEED')
  }

  onMetadataSelection(metadata: MetadataRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
