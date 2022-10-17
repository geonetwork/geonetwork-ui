import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchService } from '@geonetwork-ui/feature/search'
import { Organisation } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { OrganisationsService } from './organisations.service'

export const ITEMS_ON_PAGE = 6

@Component({
  selector: 'gn-ui-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsComponent {
  constructor(
    private organisationsService: OrganisationsService,
    private searchService: SearchService
  ) {}
  totalPages: number
  currentPage$ = new BehaviorSubject(1)
  sortBy$ = new BehaviorSubject('name-asc')

  organisationsSorted$: Observable<Organisation[]> = combineLatest([
    this.organisationsService.getOrganisationsWithGroups(),
    this.sortBy$,
  ]).pipe(
    map(([organisations, sortBy]) =>
      this.sortOrganisations(organisations, sortBy)
    )
  )

  organisations$: Observable<Organisation[]> = combineLatest([
    this.organisationsSorted$,
    this.currentPage$,
  ]).pipe(
    tap(
      ([organisations]) =>
        (this.totalPages = Math.ceil(organisations.length / ITEMS_ON_PAGE))
    ),
    map(([organisations, page]) =>
      organisations.slice((page - 1) * ITEMS_ON_PAGE, page * ITEMS_ON_PAGE)
    )
  )

  protected setCurrentPage(page: number): void {
    this.currentPage$.next(page)
  }

  protected setSortBy(value: string): void {
    this.sortBy$.next(value)
  }

  private sortOrganisations(
    organisations: Organisation[],
    sortBy: string
  ): Organisation[] {
    const sortValue = sortBy.split('-')
    const attribute = sortValue[0]
    const order = sortValue[1]
    const orderParam = order === 'asc' ? [1, -1] : [-1, 1]
    return [...organisations].sort((a, b) =>
      a[`${attribute}`] > b[`${attribute}`]
        ? orderParam[0]
        : b[`${attribute}`] > a[`${attribute}`]
        ? orderParam[1]
        : 0
    )
  }

  searchByOrganisation(organisation: Organisation) {
    this.searchService.setSearch({
      OrgForResource: { [organisation.name]: true },
    })
  }
}
