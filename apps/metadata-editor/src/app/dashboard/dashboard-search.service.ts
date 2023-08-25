import { Injectable } from '@angular/core'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { combineLatest } from 'rxjs'
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
    private dashboardFacade: DashboardFacade,
    private authService: AuthService
  ) {
    this.facade.init('editor')
    this.facade
      .setConfigRequestFields(includes)
      .setPagination(0, 10)
      .setSortBy(['desc', 'changeDate'])

    combineLatest([
      this.dashboardFacade.activeMenu$,
      authService.user$,
    ]).subscribe(([menu, user]) => {
      let filters
      switch (menu) {
        case 'my-records':
          filters = {
            owner: { [user.id]: true },
          }
          break
        case 'my-org':
          filters = {
            Org: { [user.organisation]: true },
          }
          break
        case 'catalog':
        default:
          break
      }
      this.facade.setFilters(filters)
    })
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
