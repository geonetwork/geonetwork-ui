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
import {
  MaxLinesComponent,
  Paginable,
  PaginationDotsComponent,
  PreviousNextButtonsComponent,
} from '@geonetwork-ui/ui/layout'
import { LetDirective } from '@ngrx/component'
import {
  ErrorComponent,
  ErrorType,
  RelatedRecordCardComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  Observable,
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
import { startWith } from 'rxjs/operators'

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
    PreviousNextButtonsComponent,
    UiElementsModule,
    UiSearchModule,
    MaxLinesComponent,
    UiDatavizModule,
    RouterLink,
    UiWidgetsModule,
    ErrorComponent,
    SpinningLoaderComponent,
    RelatedRecordCardComponent,
    PaginationDotsComponent,
  ],
})
export class OrganizationDetailsComponent
  implements OnInit, OnDestroy, Paginable
{
  protected readonly ErrorType = ErrorType
  protected readonly ROUTER_ROUTE_SEARCH = ROUTER_ROUTE_SEARCH

  subscriptions$: Subscription = new Subscription()

  isSearchFacadeLoading = true

  currentOrganization$ = new BehaviorSubject<Organization>(null)
  @Input() set organization(value: Organization) {
    this.currentOrganization$.next(value)
  }
  @Input() paginationContainerClass = 'w-full bottom-0 top-auto'

  lastPublishedDatasets$: Observable<CatalogRecord[]> =
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
      startWith([])
    )

  constructor(
    private searchFacade: SearchFacade,
    private organizationsService: OrganizationsServiceInterface
  ) {}

  ngOnInit(): void {
    this.searchFacade.setPageSize(3)
    this.manageSubscriptions()
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe()
  }

  get hasPagination() {
    return this.pagesCount > 1
  }

  pagesCount_ = 0
  currentPage_ = 1

  // Paginable API
  get currentPage() {
    return this.currentPage_
  }
  get pagesCount() {
    return this.pagesCount_
  }
  get isFirstPage() {
    return this.currentPage === 1
  }
  get isLastPage() {
    return this.currentPage === this.pagesCount
  }
  goToPrevPage() {
    this.searchFacade.paginate(this.currentPage - 1)
  }
  goToNextPage() {
    this.searchFacade.paginate(this.currentPage + 1)
  }
  goToPage(page: number) {
    this.searchFacade.paginate(page)
  }

  private manageSubscriptions() {
    this.subscriptions$.add(
      combineLatest([
        this.searchFacade.isLoading$.pipe(distinctUntilChanged()),
        this.searchFacade.totalPages$.pipe(distinctUntilChanged()),
        this.searchFacade.currentPage$.pipe(distinctUntilChanged()),
      ]).subscribe(([isSearchFacadeLoading, totalPages, currentPage]) => {
        this.isSearchFacadeLoading = isSearchFacadeLoading
        this.pagesCount_ = totalPages
        this.currentPage_ = currentPage
      })
    )
  }

  protected readonly errorTypes = ErrorType
}
