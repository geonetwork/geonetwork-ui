import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { first, tap } from 'rxjs/operators'

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
    this.searchFacade
      .setConfigRequestFields({
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
      .setPagination(0, 10)
      .setSortBy('changeDate')
  }

  createRecord() {
    this.router.navigate(['/create'])
  }
  editRecord(record: MetadataRecord) {
    this.router.navigate(['/edit', record.uuid])
  }

  paginate(page: number) {
    this.searchFacade.size$
      .pipe(
        first(),
        tap((size) =>
          this.searchFacade
            .setPagination(this.getFromFromPage(page, size), size)
            .clearResults()
            .requestMoreResults()
        )
      )
      .subscribe()
  }

  private getFromFromPage(page: number, size: number) {
    return (page - 1) * size
  }
}
