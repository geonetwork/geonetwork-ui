import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {
  DatasetRecord,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record'
import {
  ButtonComponent,
  DateRangeInputsComponent,
  CheckToggleComponent,
} from '@geonetwork-ui/ui/inputs'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { Extent, MapContext } from '@geospatial-sdk/core/dist/model'
import { StacItemsResultGridComponent } from '@geonetwork-ui/ui/elements'
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
  pairwise,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs'
import { GetCollectionItemsOptions, StacItem } from '@camptocamp/ogc-client'
import { MdViewFacade } from '../state'
import { MapUtilsService } from '@geonetwork-ui/feature/map'
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
    MapContainerComponent,
    CheckToggleComponent,
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

  initialSpatialExtent: Extent | null = null
  resolvedInitialSpatialExtent: Extent | null = null
  currentSpatialExtent$ = new BehaviorSubject<Extent | null>(null)
  isSpatialFilterEnabled$ = new BehaviorSubject<boolean>(true)
  mapContext$ = new BehaviorSubject<MapContext>({
    layers: [],
    view: null,
  })

  initialPageUrl: string
  previousPageUrl: string
  nextPageUrl: string
  currentPageUrl$ = new BehaviorSubject<string | null>(null)

  items$: Observable<StacItem[]> = combineLatest([
    this.currentPageUrl$,
    this.currentTemporalExtent$,
    this.isSpatialFilterEnabled$,
    this.currentSpatialExtent$,
  ]).pipe(
    debounceTime(DEBOUNCE_TIME_MS),
    startWith([null, null, false, null] as [
      string | null,
      DatasetTemporalExtent | null,
      boolean,
      Extent | null,
    ]),
    pairwise(),
    switchMap(([previous, latest]) => {
      this.error = null
      const options: GetCollectionItemsOptions = {
        limit: STAC_ITEMS_PER_PAGE,
      }

      const [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _oldCurrentPageUrl,
        oldTemporalExtent,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _oldIsSpatialFilterEnabled,
        oldSpatialExtent,
      ] = previous
      const [
        newCurrentPageUrl,
        newTemporalExtent,
        newIsSpatialFilterEnabled,
        newSpatialExtent,
      ] = latest

      if (
        oldTemporalExtent !== newTemporalExtent ||
        oldSpatialExtent?.[0] !== newSpatialExtent?.[0] ||
        oldSpatialExtent?.[1] !== newSpatialExtent?.[1] ||
        oldSpatialExtent?.[2] !== newSpatialExtent?.[2] ||
        oldSpatialExtent?.[3] !== newSpatialExtent?.[3]
      ) {
        this.currentPageUrl$.next(this.initialPageUrl)
      }

      if (
        newTemporalExtent &&
        (newTemporalExtent.start || newTemporalExtent.end)
      ) {
        options.datetime = {
          ...(newTemporalExtent.start && { start: newTemporalExtent.start }),
          ...(newTemporalExtent.end && { end: newTemporalExtent.end }),
        }
      }

      if (newIsSpatialFilterEnabled && newSpatialExtent) {
        options.bbox = newSpatialExtent
      }

      return from(
        this.dataService.getItemsFromStacApi(newCurrentPageUrl, options)
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
        this.currentTemporalExtent$.next(temporalExtent)

        this.initialSpatialExtent = spatialExtent
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
          this.currentPageUrl$.next(link.url.href)
        }
      })
  }

  onTemporalExtentChange(extent: DatasetTemporalExtent | null) {
    this.currentTemporalExtent$.next(extent)
    this.isFilterModified = true
  }

  onSpatialExtentChange(extent: Extent) {
    this.currentSpatialExtent$.next(extent)

    if (this.resolvedInitialSpatialExtent) {
      this.isFilterModified =
        extent[0] !== this.resolvedInitialSpatialExtent[0] ||
        extent[1] !== this.resolvedInitialSpatialExtent[1] ||
        extent[2] !== this.resolvedInitialSpatialExtent[2] ||
        extent[3] !== this.resolvedInitialSpatialExtent[3]
    } else {
      this.isFilterModified = true
    }
  }

  onResolvedMapExtentChange(extent: Extent) {
    this.resolvedInitialSpatialExtent = extent
  }

  onSpatialFilterToggle(enabled: boolean) {
    this.isSpatialFilterEnabled$.next(enabled)
  }

  onResetFilters() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent)
    this.currentSpatialExtent$.next(null)
    this.isFilterModified = false

    this.mapContext$.next({
      ...this.mapContext$.value,
      view: {
        extent: this.initialSpatialExtent,
      },
    })
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
