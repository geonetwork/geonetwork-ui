import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import {
  DatasetServiceDistribution,
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
  tap,
} from 'rxjs'
import { GetCollectionItemsOptions } from '@camptocamp/ogc-client'

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
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  @Input() link: DatasetServiceDistribution
  @Input() initialTemporalExtent: DatasetTemporalExtent | null

  isFilterModified = false
  previousPageUrl: string
  nextPageUrl: string

  items$: Observable<{ id: string; datetime: string }[]>
  currentTemporalExtent$ = new BehaviorSubject<DatasetTemporalExtent | null>(
    null
  )
  currentPageUrl$ = new BehaviorSubject<string | null>(null)

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent)
    this.currentPageUrl$.next(this.link.url.href)

    this.items$ = combineLatest([
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
      })
    )
  }

  onTemporalExtentChange(extent: DatasetTemporalExtent | null) {
    this.currentTemporalExtent$.next(extent)
    this.isFilterModified = true
  }

  onResetFilters() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent)
    this.isFilterModified = false
  }
}
