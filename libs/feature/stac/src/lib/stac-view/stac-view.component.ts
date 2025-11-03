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
import { BehaviorSubject, from, map, Observable, switchMap } from 'rxjs'
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

  items$: Observable<{ id: string; datetime: string }[]>
  currentTemporalExtent$: BehaviorSubject<DatasetTemporalExtent | null> =
    new BehaviorSubject<DatasetTemporalExtent | null>(null)

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent)
    this.items$ = this.currentTemporalExtent$.pipe(
      switchMap((temporalExtent) => {
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
          this.dataService.getItemsFromStacApi(this.link.url.href, options)
        ).pipe(
          map((items) =>
            items.map((item) => ({
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
