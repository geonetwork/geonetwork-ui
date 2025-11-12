import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {
  DatasetRecord,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record'
import { StacItemsResultGridComponent } from '@geonetwork-ui/ui/elements'
import {
  ButtonComponent,
  DateRangeInputsComponent,
} from '@geonetwork-ui/ui/inputs'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matDeleteOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective, TranslateService } from '@ngx-translate/core'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs'
import { GetCollectionItemsOptions, StacItem } from '@camptocamp/ogc-client'
import { MdViewFacade } from '../state'
import { PreviousNextButtonsComponent } from '@geonetwork-ui/ui/layout'
import { FetchError } from '@geonetwork-ui/data-fetcher'
import { PopupAlertComponent } from '@geonetwork-ui/ui/widgets'

const STAC_ITEMS_PER_PAGE = 12
const DEBOUNCE_TIME_MS = 500

@Component({
  selector: 'gn-ui-stac-view',
  templateUrl: './stac-view.component.html',
  styleUrls: ['./stac-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    TranslateDirective,
    StacItemsResultGridComponent,
    DateRangeInputsComponent,
    PreviousNextButtonsComponent,
    PopupAlertComponent,
    ButtonComponent,
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  isFilterModified = false
  error = null

  initialTemporalExtent: DatasetTemporalExtent | null = null
  currentTemporalExtent$ = new BehaviorSubject<DatasetTemporalExtent | null>(
    null
  )

  previousPageUrl: string
  nextPageUrl: string
  currentPageUrl$ = new BehaviorSubject<string | null>(null)

  items$: Observable<StacItem[]> = combineLatest([
    this.currentPageUrl$,
    this.currentTemporalExtent$,
  ]).pipe(
    debounceTime(DEBOUNCE_TIME_MS),
    switchMap(([currentPageUrl, temporalExtent]) => {
      this.error = null
      const options: GetCollectionItemsOptions = {
        limit: STAC_ITEMS_PER_PAGE,
      }
      if (temporalExtent && (temporalExtent.start || temporalExtent.end)) {
        options.datetime = {
          ...(temporalExtent.start && { start: temporalExtent.start }),
          ...(temporalExtent.end && { end: temporalExtent.end }),
        }
      }
      return from(
        this.dataService.getItemsFromStacApi(currentPageUrl, options)
      ).pipe(
        tap((stacDocument) => {
          this.previousPageUrl =
            stacDocument.links.find((link) => link.rel === 'previous')?.href ||
            null
          this.nextPageUrl =
            stacDocument.links.find((link) => link.rel === 'next')?.href || null
        }),
        map((stacDocument) => stacDocument.features),
        catchError((err) => {
          this.handleError(err)
          return of([])
        })
      )
    })
  )

  constructor(
    private dataService: DataService,
    private metadataViewFacade: MdViewFacade,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.metadataViewFacade.metadata$
      .pipe(
        take(1),
        map((metadata) => {
          const temporalExtents =
            metadata?.kind === 'dataset'
              ? (metadata as DatasetRecord).temporalExtents
              : []

          return temporalExtents.length > 0
            ? temporalExtents[0]
            : ({
                start: null,
                end: null,
              } as DatasetTemporalExtent)
        })
      )
      .subscribe((extent) => {
        this.initialTemporalExtent = extent
        this.currentTemporalExtent$.next(extent)
      })

    this.metadataViewFacade.stacLinks$
      .pipe(
        take(1),
        map((links) => (links && links.length > 0 ? links[0] : null))
      )
      .subscribe((link) => {
        if (link) {
          this.currentPageUrl$.next(link.url.href)
        }
      })
  }

  onTemporalExtentChange(extent: DatasetTemporalExtent | null) {
    this.currentTemporalExtent$.next(extent)
    this.currentPageUrl$.next(
      this.removePaginationToken(this.currentPageUrl$.value)
    )
    this.isFilterModified = true
  }

  onResetFilters() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent)
    this.isFilterModified = false
  }

  removePaginationToken(url: string): string {
    if (!url) return url
    const urlObj = new URL(url)
    urlObj.searchParams.delete('token')
    return urlObj.toString()
  }

  handleError(error: FetchError | Error | string) {
    if (error instanceof FetchError) {
      this.error = this.translateService.instant(
        `dataset.error.${error.type}`,
        {
          info: error.info,
        }
      )
      console.warn(error.message)
    } else if (error instanceof Error) {
      this.error = this.translateService.instant(error.message)
      console.warn(error.stack || error)
    } else {
      this.error = this.translateService.instant(error)
      console.warn(error)
    }
  }

  // Paginable API
  get isFirstPage() {
    return this.previousPageUrl == null
  }
  get isLastPage() {
    return this.nextPageUrl == null
  }
  goToNextPage() {
    this.currentPageUrl$.next(this.nextPageUrl)
  }
  goToPrevPage() {
    this.currentPageUrl$.next(this.previousPageUrl)
  }
}
