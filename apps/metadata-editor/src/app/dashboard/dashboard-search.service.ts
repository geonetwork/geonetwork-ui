import { Injectable } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { first, tap } from 'rxjs/operators'
import { DashboardFacade } from './+state/dashboard.facade'

const includes = [
  'uuid',
  'resourceTitleObject',
  'createDate',
  'changeDate',
  'userinfo',
  'cl_status',
  'isPublishedToAll',
]

@Injectable()
export class DashboardSearchService {
  constructor(
    private facade: SearchFacade,
    private dashboardFacade: DashboardFacade
  ) {
    this.facade.init('editor')
    this.facade
      .setConfigRequestFields({
        includes,
      })
      .setPagination(0, 10)
      .setSortBy('changeDate')
  }

  paginate(page: number) {
    this.facade.size$
      .pipe(
        first(),
        tap((size) =>
          this.facade
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
