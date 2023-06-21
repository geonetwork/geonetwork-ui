import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Organisation } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { map, startWith, tap } from 'rxjs/operators'
import { OrganisationsServiceInterface } from './service/organisations.service.interface'

@Component({
  selector: 'gn-ui-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsComponent {
  @Input() itemsOnPage = 12
  @Output() orgSelect = new EventEmitter<Organisation>()

  constructor(private organisationsService: OrganisationsServiceInterface) {}
  totalPages: number
  currentPage$ = new BehaviorSubject(1)
  sortBy$ = new BehaviorSubject('name-asc')

  organisationsSorted$: Observable<Organisation[]> = combineLatest([
    this.organisationsService.organisations$.pipe(
      startWith(Array(this.itemsOnPage).fill({}))
    ),
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

  protected setSortBy(value: string): void {
    this.sortBy$.next(value)
  }

  private sortOrganisations(
    organisations: Organisation[],
    sortBy: string
  ): Organisation[] {
    const sortParts = sortBy.split('-')
    const attribute = sortParts[0]
    const direction = sortParts[1] === 'asc' ? 1 : -1
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
}
