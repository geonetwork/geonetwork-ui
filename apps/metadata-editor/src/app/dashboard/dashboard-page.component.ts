import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade, SearchService],
})
export class DashboardPageComponent {
  constructor(public searchFacade: SearchFacade) {
    this.searchFacade.init('editor')
    this.searchFacade.setConfigRequestFields({
      includes: [
        'resourceTitleObject',
        'createDate',
        'changeDate',
        'userinfo',
        'cl_status',
        'isPublishedToAll',
      ],
    })
    this.searchFacade.setPagination(0, 10)
    this.searchFacade.setSortBy('changeDate')
    this.searchFacade.requestMoreResults()
  }
}
