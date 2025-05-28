import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslateModule } from '@ngx-translate/core'
import { MaxLinesComponent } from '@geonetwork-ui/ui/layout'
import { LetDirective } from '@ngrx/component'
import {
  ErrorComponent,
  ErrorType,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import {
  BehaviorSubject,
  distinctUntilChanged,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { RouterLink } from '@angular/router'
import { ROUTER_ROUTE_SEARCH } from '@geonetwork-ui/feature/router'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  SpinningLoaderComponent,
  UiWidgetsModule,
} from '@geonetwork-ui/ui/widgets'
import { map, startWith, tap } from 'rxjs/operators'
import { RecordInternalLinksComponent } from '../../record/record-internal-links/record-internal-links.component'

@Component({
  selector: 'datahub-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LetDirective,
    UiElementsModule,
    UiSearchModule,
    MaxLinesComponent,
    UiDatavizModule,
    RouterLink,
    UiWidgetsModule,
    ErrorComponent,
    SpinningLoaderComponent,
    RecordInternalLinksComponent,
  ],
})
export class OrganizationDetailsComponent implements OnInit, OnDestroy {
  protected readonly ErrorType = ErrorType
  protected readonly ROUTER_ROUTE_SEARCH = ROUTER_ROUTE_SEARCH

  subscriptions$: Subscription = new Subscription()

  isSearchFacadeLoading$ = of(true)

  currentOrganization$ = new BehaviorSubject<Organization>(null)
  @Input() set organization(value: Organization) {
    this.currentOrganization$.next(value)
  }
  @Input() paginationContainerClass = 'w-full bottom-0 top-auto'

  lastPublishedDatasets$: Observable<Partial<CatalogRecord>[]> =
    this.currentOrganization$.pipe(
      switchMap((organization) =>
        this.organizationsService.getFiltersForOrgs([organization])
      ),
      switchMap(
        (filters) =>
          this.searchFacade
            .setFilters(filters)
            .setSortBy(['desc', 'changeDate']).results$
      ),
      // remove ownerOrganization so it will not be displayed on cards
      map((records) =>
        records.map((record) => {
          const { ownerOrganization, ...rest } = record
          return rest
        })
      ),
      startWith([])
    )

  constructor(
    private searchFacade: SearchFacade,
    private organizationsService: OrganizationsServiceInterface
  ) {}

  ngOnInit(): void {
    this.searchFacade.setPageSize(12)
    this.isSearchFacadeLoading$ = this.searchFacade.isLoading$.pipe(
      distinctUntilChanged()
    )
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe()
  }

  protected readonly errorTypes = ErrorType
}
