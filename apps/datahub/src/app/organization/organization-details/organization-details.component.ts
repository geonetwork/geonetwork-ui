import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
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
import { Observable, of, Subscription, switchMap } from 'rxjs'
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
  ],
})
export class OrganizationDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  protected readonly Error = Error
  protected readonly ErrorType = ErrorType

  @Input() organization: Organization

  lastPublishedDatasets$: Observable<CatalogRecord[]> = of([])

  subscriptions$: Subscription = new Subscription()

  isOrganizationsLoading = true

  totalPages = 0
  currentPage = 1
  isFirstPage = this.currentPage === 1
  isLastPage = false

  @ViewChild(BlockListComponent) list: BlockListComponent

  constructor(
    private changeDetector: ChangeDetectorRef,
    private searchFacade: SearchFacade,
    private organizationsService: OrganizationsServiceInterface
  ) {}

  ngOnInit(): void {
    this.searchFacade.setPageSize(3)

    this.lastPublishedDatasets$ = this.organizationsService
      .getFiltersForOrgs([this.organization])
      .pipe(
        switchMap((filters) => {
          return this.searchFacade
            .setFilters(filters)
            .setSortBy(['desc', 'changeDate']).results$
        })
      )

    this.manageSubscriptions()
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

  private manageSubscriptions() {
    this.subscriptions$.add(
      this.searchFacade.isLoading$.subscribe(
        (isOrganizationsLoading) =>
          (this.isOrganizationsLoading = isOrganizationsLoading)
      )
    )

    this.subscriptions$.add(
      this.searchFacade.totalPages$.subscribe(
        (totalPages) => (this.totalPages = totalPages)
      )
    )

    this.subscriptions$.add(
      this.searchFacade.isBeginningOfResults$.subscribe(
        (isBeginningOfResults) => (this.isFirstPage = isBeginningOfResults)
      )
    )

    this.subscriptions$.add(
      this.searchFacade.isEndOfResults$.subscribe(
        (isEndOfResults) => (this.isLastPage = isEndOfResults)
      )
    )

    this.subscriptions$.add(
      this.searchFacade.currentPage$.subscribe(
        (currentPage) => (this.currentPage = currentPage)
      )
    )
  }

  protected readonly ROUTER_ROUTE_SEARCH = ROUTER_ROUTE_SEARCH
}
