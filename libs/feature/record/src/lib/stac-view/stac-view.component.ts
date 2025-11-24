import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  DatasetRecord,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record'
import {
  ButtonComponent,
  DateRangeInputsComponent,
  CheckToggleComponent,
} from '@geonetwork-ui/ui/inputs'
import {
  MapContainerComponent,
  prioritizePageScroll,
} from '@geonetwork-ui/ui/map'
import { Extent, MapContext } from '@geospatial-sdk/core/dist/model'
import { StacItemsResultGridComponent } from '@geonetwork-ui/ui/elements'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matDeleteOutline } from '@ng-icons/material-icons/outline'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs'
import { GetCollectionItemsOptions, StacItem } from '@camptocamp/ogc-client'
import { MdViewFacade } from '../state'
import {
  areSpatialExtentsEqual,
  areTemporalExtentsEqual,
  areFilterStatesEqual,
} from './utils'
import { MapUtilsService } from '@geonetwork-ui/feature/map'
import { PreviousNextButtonsComponent } from '@geonetwork-ui/ui/layout'
import { FetchError } from '@geonetwork-ui/data-fetcher'
import { PopupAlertComponent } from '@geonetwork-ui/ui/widgets'

const STAC_ITEMS_PER_PAGE = 12
const DEBOUNCE_TIME_MS = 500

export interface StacFilterState {
  temporalExtent: DatasetTemporalExtent | null
  spatialExtent: Extent | null
  isSpatialExtentFilterEnabled: boolean
  pageUrl: string | null
}

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
    TranslatePipe,
    StacItemsResultGridComponent,
    DateRangeInputsComponent,
    MapContainerComponent,
    CheckToggleComponent,
    PreviousNextButtonsComponent,
    PopupAlertComponent,
    ButtonComponent,
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') mapContainer: MapContainerComponent

  initialTemporalExtent: DatasetTemporalExtent | null = null
  initialSpatialExtent: Extent | null = null
  resolvedInitialSpatialExtent: Extent | null = null
  initialPageUrl: string
  previousPageUrl: string
  nextPageUrl: string

  error$ = new BehaviorSubject<string | null>(null)
  mapContext$ = new BehaviorSubject<MapContext>({
    layers: [],
    view: null,
  })
  filterState$ = new BehaviorSubject<StacFilterState>({
    temporalExtent: null,
    spatialExtent: null,
    isSpatialExtentFilterEnabled: true,
    pageUrl: null,
  })

  isFilterModified$ = this.filterState$.pipe(
    map((filterState) => {
      const isTemporalModified = !areTemporalExtentsEqual(
        filterState.temporalExtent,
        this.initialTemporalExtent
      )

      const isSpatialModified =
        this.resolvedInitialSpatialExtent &&
        filterState.spatialExtent !== null &&
        filterState.isSpatialExtentFilterEnabled &&
        !areSpatialExtentsEqual(
          filterState.spatialExtent,
          this.resolvedInitialSpatialExtent
        )

      return isTemporalModified || isSpatialModified
    }),
    shareReplay({ bufferSize: 1, refCount: false })
  )

  items$: Observable<StacItem[]> = this.filterState$.pipe(
    debounceTime(DEBOUNCE_TIME_MS),
    distinctUntilChanged((prev, curr) => areFilterStatesEqual(prev, curr)),
    switchMap((filterState) => {
      if (filterState.pageUrl === null) {
        return of([])
      }

      this.error$.next(null)
      return from(
        this.dataService.getItemsFromStacApi(
          filterState.pageUrl,
          this.buildRequestOptions(filterState)
        )
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
    }),
    shareReplay({ bufferSize: 1, refCount: false })
  )

  constructor(
    private dataService: DataService,
    private metadataViewFacade: MdViewFacade,
    private mapUtils: MapUtilsService,
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

          const temporalExtent =
            temporalExtents.length > 0
              ? temporalExtents[0]
              : ({
                  start: null,
                  end: null,
                } as DatasetTemporalExtent)

          const spatialExtent = this.mapUtils.getRecordExtent(metadata)
          return { temporalExtent, spatialExtent }
        })
      )
      .subscribe(({ temporalExtent, spatialExtent }) => {
        this.initialTemporalExtent = temporalExtent
        this.initialSpatialExtent = spatialExtent

        this.filterState$.next({
          ...this.filterState$.value,
          temporalExtent: this.initialTemporalExtent,
          pageUrl: this.initialPageUrl,
        })

        this.mapContext$.next({
          ...this.mapContext$.value,
          view: {
            extent: spatialExtent,
          },
        })
      })

    this.metadataViewFacade.stacLinks$
      .pipe(
        take(1),
        map((links) => (links && links.length > 0 ? links[0] : null))
      )
      .subscribe((link) => {
        if (link) {
          this.initialPageUrl = link.url.href
          this.filterState$.next({
            ...this.filterState$.value,
            pageUrl: link.url.href,
          })
        }
      })
  }

  async ngAfterViewInit() {
    const map = await this.mapContainer.openlayersMap
    prioritizePageScroll(map.getInteractions())
  }

  onTemporalExtentChange(extent: DatasetTemporalExtent | null) {
    this.filterState$.next({
      ...this.filterState$.value,
      temporalExtent: extent,
      pageUrl: this.initialPageUrl,
    })
  }

  onSpatialExtentChange(extent: Extent) {
    this.filterState$.next({
      ...this.filterState$.value,
      spatialExtent: extent,
      pageUrl: this.initialPageUrl,
    })
  }

  onResolvedMapExtentChange(extent: Extent) {
    this.resolvedInitialSpatialExtent = extent
  }

  onSpatialFilterToggle(enabled: boolean) {
    this.filterState$.next({
      ...this.filterState$.value,
      isSpatialExtentFilterEnabled: enabled,
      pageUrl: this.initialPageUrl,
    })
  }

  onResetFilters() {
    this.mapContext$.next({
      ...this.mapContext$.value,
      view: {
        extent: this.initialSpatialExtent,
      },
    })

    this.filterState$.next({
      temporalExtent: this.initialTemporalExtent,
      spatialExtent: this.resolvedInitialSpatialExtent,
      isSpatialExtentFilterEnabled: true,
      pageUrl: this.initialPageUrl,
    })
  }

  private buildRequestOptions(
    filterState: StacFilterState
  ): GetCollectionItemsOptions {
    const options: GetCollectionItemsOptions = {
      limit: STAC_ITEMS_PER_PAGE,
    }

    if (
      filterState.temporalExtent &&
      (filterState.temporalExtent.start || filterState.temporalExtent.end)
    ) {
      options.datetime = {
        ...(filterState.temporalExtent.start && {
          start: filterState.temporalExtent.start,
        }),
        ...(filterState.temporalExtent.end && {
          end: filterState.temporalExtent.end,
        }),
      }
    }

    if (filterState.isSpatialExtentFilterEnabled && filterState.spatialExtent) {
      options.bbox = filterState.spatialExtent
    }

    return options
  }

  handleError(error: FetchError | Error | string) {
    if (error instanceof FetchError) {
      this.error$.next(
        this.translateService.instant(`dataset.error.${error.type}`, {
          info: error.info,
        })
      )
      console.warn(error.message)
    } else if (error instanceof Error) {
      this.error$.next(this.translateService.instant(error.message))
      console.warn(error.stack || error)
    } else {
      this.error$.next(this.translateService.instant(error))
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
    this.filterState$.next({
      ...this.filterState$.value,
      pageUrl: this.nextPageUrl,
    })
  }
  goToPrevPage() {
    this.filterState$.next({
      ...this.filterState$.value,
      pageUrl: this.previousPageUrl,
    })
  }
}
