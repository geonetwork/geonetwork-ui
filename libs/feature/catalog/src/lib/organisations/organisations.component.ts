import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  constructor(private organisationsService: OrganisationsService) {}
  totalPages: number
  currentPage$ = new BehaviorSubject(1)

  organisations$: Observable<Organisation[]> = combineLatest([
    this.organisationsService.getOrganisationsWithGroups(),
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
}
