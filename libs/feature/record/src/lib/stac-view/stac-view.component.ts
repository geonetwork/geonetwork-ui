import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {
  DatasetRecord,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record'
import { ResultsGridComponent } from '@geonetwork-ui/ui/elements'
import { DateRangeInputsComponent } from '@geonetwork-ui/ui/inputs'
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
import { PreviousNextButtonsComponent } from '@geonetwork-ui/ui/layout'

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
    PreviousNextButtonsComponent,
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  isFilterModified = false

  initialTemporalExtent: DatasetTemporalExtent | null = null
  currentTemporalExtent$ = new BehaviorSubject<DatasetTemporalExtent | null>(
    null
  )

  previousPageUrl: string
  nextPageUrl: string
  currentPageUrl$ = new BehaviorSubject<string | null>(null)

  items$: Observable<{ id: string; datetime: string }[]> = combineLatest([
    this.currentPageUrl$,
    this.currentTemporalExtent$,
  ]).pipe(
    switchMap(([currentPageUrl, temporalExtent]) => {
      const options: GetCollectionItemsOptions = {
        limit: STAC_ITEMS_PER_PAGE,
      }
      if (temporalExtent) {
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
        map((stacDocument) =>
          stacDocument.features.map((item) => ({
            id: item.id,
            datetime: item.properties.datetime,
          }))
        )
      )
    })
  )

  constructor(
    private dataService: DataService,
    private metadataViewFacade: MdViewFacade
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
    this.isFilterModified = true
  }

  onResetFilters() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent)
    this.isFilterModified = false
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
