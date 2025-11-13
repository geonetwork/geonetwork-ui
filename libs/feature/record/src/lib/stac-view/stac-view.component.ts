import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {
  DatasetRecord,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record'
import { ResultsGridComponent } from '@geonetwork-ui/ui/elements'
import {
  DateRangeInputsComponent,
  CheckToggleComponent,
} from '@geonetwork-ui/ui/inputs'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import {
  Extent,
  MapContext,
  MapContextView,
} from '@geospatial-sdk/core/dist/model'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matDeleteOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective } from '@ngx-translate/core'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import {
  BehaviorSubject,
  combineLatest,
  from,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs'
import { GetCollectionItemsOptions } from '@camptocamp/ogc-client'
import { MdViewFacade } from '../state'
import { MapUtilsService } from '@geonetwork-ui/feature/map'

const STAC_ITEMS_PER_PAGE = 12

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
    ResultsGridComponent,
    DateRangeInputsComponent,
    MapContainerComponent,
    CheckToggleComponent,
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  isFilterModified = false

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

  previousPageUrl: string
  nextPageUrl: string
  currentPageUrl$ = new BehaviorSubject<string | null>(null)

  items$: Observable<
    {
      id: string
      datetime: string
    }[]
  > = combineLatest([
    this.currentPageUrl$,
    this.currentTemporalExtent$,
    this.isSpatialFilterEnabled$,
    this.currentSpatialExtent$,
  ]).pipe(
    switchMap(
      ([
        currentPageUrl,
        temporalExtent,
        isSpatialFilterEnabled,
        spatialExtent,
      ]) => {
        const options: GetCollectionItemsOptions = {
          limit: STAC_ITEMS_PER_PAGE,
        }

        if (temporalExtent) {
          options.datetime = {
            ...(temporalExtent.start && { start: temporalExtent.start }),
            ...(temporalExtent.end && { end: temporalExtent.end }),
          }
        }

        if (isSpatialFilterEnabled && spatialExtent) {
          options.bbox = spatialExtent
        }

        return from(
          this.dataService.getItemsFromStacApi(currentPageUrl, options)
        ).pipe(
          tap((stacDocument) => {
            stacDocument.links.forEach((link) => {
              this.previousPageUrl = link.rel === 'prev' ? link.href : null
              this.nextPageUrl = link.rel === 'next' ? link.href : null
            })
          }),
          map((stacDocument) =>
            stacDocument.features.map((item) => ({
              id: item.id,
              datetime: item.properties.datetime,
            }))
          )
        )
      }
    )
  )

  constructor(
    private dataService: DataService,
    private metadataViewFacade: MdViewFacade,
    private mapUtils: MapUtilsService
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
}
