import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'md-editor-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade, SearchService],
})
export class DashboardPageComponent {
  constructor(public searchFacade: SearchFacade, private router: Router) {
    this.searchFacade.init('editor')
    this.searchFacade.setConfigRequestFields({
      includes: [
        'uuid',
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

  editRecord(record: MetadataRecord) {
    this.router.navigate(['/edit', record.uuid])
  }
}
