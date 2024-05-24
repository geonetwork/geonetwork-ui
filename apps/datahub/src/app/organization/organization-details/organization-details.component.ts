import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import {
  ButtonComponent,
  PreviousNextButtonsComponent,
} from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import {
  BlockListComponent,
  CarouselComponent,
  MaxLinesComponent,
} from '@geonetwork-ui/ui/layout'
import { LetDirective } from '@ngrx/component'
import {
  ErrorType,
  LinkCardComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import {
  BehaviorSubject,
  combineLatest,
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
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'

@Component({
  selector: 'datahub-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ButtonComponent,
    MatIconModule,
    TranslateModule,
    CarouselComponent,
    BlockListComponent,
    LetDirective,
    LinkCardComponent,
    NgForOf,
    PreviousNextButtonsComponent,
    UiElementsModule,
    UiSearchModule,
    MaxLinesComponent,
    UiDatavizModule,
    RouterLink,
    UiWidgetsModule,
    NgClass,
  ],
})
export class OrganizationDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  protected readonly Error = Error
  protected readonly ErrorType = ErrorType
  protected readonly ROUTER_ROUTE_SEARCH = ROUTER_ROUTE_SEARCH

  protected get pages() {
    return new Array(this.totalPages).fill(0).map((_, i) => i + 1)
  }

  lastPublishedDatasets$: Observable<CatalogRecord[]> = of([])

  subscriptions$: Subscription = new Subscription()

  isSearchFacadeLoading = true

  totalPages = 0
  currentPage = 1
  isFirstPage = this.currentPage === 1
  isLastPage = false

  organizationHasChanged$ = new BehaviorSubject<void>(undefined)

  @Input() organization?: Organization
  @Input() paginationContainerClass = 'w-full bottom-0 top-auto'

  @ViewChild(BlockListComponent) list: BlockListComponent

  constructor(
    private changeDetector: ChangeDetectorRef,
    private searchFacade: SearchFacade,
    private organizationsService: OrganizationsServiceInterface
  ) {}

  ngOnInit(): void {
    this.searchFacade.setPageSize(3)

    this.lastPublishedDatasets$ = this.organizationHasChanged$.pipe(
      distinctUntilChanged(),
      switchMap(() => {
        return this.organizationsService
          .getFiltersForOrgs([this.organization])
          .pipe(
            switchMap((filters) => {
              return this.searchFacade
                .setFilters(filters)
                .setSortBy(['desc', 'changeDate']).results$
            })
          )
      })
    )

    this.manageSubscriptions()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['organization']) {
      this.organizationHasChanged$.next()
    }
  }

  ngAfterViewInit() {
    // this is required to show the pagination correctly
    this.changeDetector.detectChanges()
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe()
  }

  get hasPagination() {
    return this.totalPages > 1
  }

  changeStepOrPage(direction: string) {
    if (direction === 'next') {
      this.searchFacade.paginate(this.currentPage + 1)
    } else {
      this.searchFacade.paginate(this.currentPage - 1)
    }
  }

  goToPage(page: number) {
    this.searchFacade.paginate(page)
  }

  private manageSubscriptions() {
    this.subscriptions$.add(
      combineLatest([
        this.searchFacade.isLoading$.pipe(distinctUntilChanged()),
        this.searchFacade.totalPages$.pipe(distinctUntilChanged()),
        this.searchFacade.isBeginningOfResults$.pipe(distinctUntilChanged()),
        this.searchFacade.isEndOfResults$.pipe(distinctUntilChanged()),
        this.searchFacade.currentPage$.pipe(distinctUntilChanged()),
      ]).subscribe(
        ([
          isSearchFacadeLoading,
          totalPages,
          isBeginningOfResults,
          isEndOfResults,
          currentPage,
        ]) => {
          this.isSearchFacadeLoading = isSearchFacadeLoading
          this.totalPages = totalPages
          this.isFirstPage = isBeginningOfResults
          this.isLastPage = isEndOfResults
          this.currentPage = currentPage
        }
      )
    )
  }

  protected readonly errorTypes = ErrorType
}
