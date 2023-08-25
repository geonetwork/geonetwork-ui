import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core'
import { Organization } from '@geonetwork-ui/common/domain/record'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { map, startWith, tap } from 'rxjs/operators'
import { ORGANIZATION_URL_TOKEN } from '../feature-catalog.module'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { SortByField } from '@geonetwork-ui/common/domain/search'

@Component({
  selector: 'gn-ui-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsComponent {
  @Input() itemsOnPage = 12
  @Output() orgSelect = new EventEmitter<Organization>()

  constructor(
    private organisationsService: OrganizationsServiceInterface,
    @Optional()
    @Inject(ORGANIZATION_URL_TOKEN)
    private urlTemplate: string
  ) {}

  totalPages: number
  currentPage$ = new BehaviorSubject(1)
  sortBy$: BehaviorSubject<SortByField> = new BehaviorSubject(['asc', 'name'])

  organisationsSorted$: Observable<Organization[]> = combineLatest([
    this.organisationsService.organisations$.pipe(
      startWith(Array(this.itemsOnPage).fill({}))
    ),
    this.sortBy$,
  ]).pipe(
    map(([organisations, sortBy]) =>
      this.sortOrganisations(organisations, sortBy)
    )
  )

  organisations$: Observable<Organization[]> = combineLatest([
    this.organisationsSorted$,
    this.currentPage$,
  ]).pipe(
    tap(
      ([organisations]) =>
        (this.totalPages = Math.ceil(organisations.length / this.itemsOnPage))
    ),
    map(([organisations, page]) =>
      organisations.slice(
        (page - 1) * this.itemsOnPage,
        page * this.itemsOnPage
      )
    )
  )

  protected setCurrentPage(page: number): void {
    this.currentPage$.next(page)
  }

  protected setSortBy(value: SortByField): void {
    this.sortBy$.next(value)
  }

  private sortOrganisations(
    organisations: Organization[],
    sortBy: SortByField
  ): Organization[] {
    let order: 'asc' | 'desc'
    let attribute: string
    if (Array.isArray(sortBy[0])) {
      order = sortBy[0][0]
      attribute = sortBy[0][1]
    } else {
      order = sortBy[0]
      attribute = sortBy[1] as string
    }
    const direction = order === 'asc' ? 1 : -1
    return [...organisations].sort((a, b) => {
      const valueA = a[attribute]
      const valueB = b[attribute]
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction * valueA.localeCompare(valueB)
      }
      return direction * Math.sign(valueA - valueB)
    })
  }

  trackByIndex(index: number) {
    return index
  }

  getOrganisationUrl(organisation: Organization): string {
    if (!this.urlTemplate) return null
    return this.urlTemplate.replace('${name}', organisation.name)
  }
}
