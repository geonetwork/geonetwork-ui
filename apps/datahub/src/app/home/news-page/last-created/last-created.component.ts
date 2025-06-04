import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { FIELDS_BRIEF, SearchFacade } from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { globalConfigFilters } from '../../../app.config'

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
      .setConfigFilters(globalConfigFilters)
      .setConfigRequestFields([...FIELDS_BRIEF, 'createDate', 'changeDate'])
      .setPageSize(10)
      .setSortBy(['desc', 'createDate'])
      .setResultsLayout('FEED')
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
