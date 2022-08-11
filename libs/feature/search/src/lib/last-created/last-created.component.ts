import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ES_SOURCE_BRIEF } from '@geonetwork-ui/util/shared'
import { SearchFacade } from '../state/search.facade'
import {
  RecordPreviewFeedComponent,
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigItem,
} from '@geonetwork-ui/ui/search'

@Component({
  selector: 'gn-ui-last-created',
  templateUrl: './last-created.component.html',
  styleUrls: ['./last-created.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: RESULTS_LAYOUT_CONFIG,
      useValue: {
        FEED: new ResultsLayoutConfigItem(
          RecordPreviewFeedComponent,
          'p-0',
          undefined,
          'gap-0 p-0'
        ),
      },
    },
  ],
})
export class LastCreatedComponent {
  constructor(private searchfacade: SearchFacade) {
    this.searchfacade.init('newsfeed') // init the search state manually
    this.searchfacade.setPagination(0, 10)
    this.searchfacade.setSortBy('-createDate')
    this.searchfacade.setConfigRequestFields({
      includes: [...ES_SOURCE_BRIEF, 'createDate', 'changeDate'],
    })
    this.searchfacade.setResultsLayout('FEED')
  }
}
