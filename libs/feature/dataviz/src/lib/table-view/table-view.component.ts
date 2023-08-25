import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util-shared'
import { BehaviorSubject, Observable, of } from 'rxjs'
import {
  catchError,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators'
import { DataItem, FetchError } from '@geonetwork-ui/data-fetcher'
import { DataService } from '../service/data.service'
import { TableItemModel } from '@geonetwork-ui/ui/dataviz'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {
  @Input() set link(value: MetadataLink) {
    this.currentLink$.next(value)
  }
  private currentLink$ = new BehaviorSubject<MetadataLink>(null)

  loading = false
  error = null

  tableData$ = this.currentLink$.pipe(
    switchMap((link) => {
      this.error = null
      if (!link) return of([] as TableItemModel[])
      this.loading = true
      return this.fetchData(link).pipe(
        map((items) =>
          items.map((item) => ({
            id: item.id,
            ...item.properties,
          }))
        ),
        catchError((error) => {
          this.handleError(error)
          return of([] as TableItemModel[])
        }),
        finalize(() => {
          this.loading = false
        })
      )
    }),
    startWith([] as TableItemModel[]),
    shareReplay(1)
  )

  constructor(
    private dataService: DataService,
    private translateService: TranslateService
  ) {}

  fetchData(link: MetadataLink): Observable<DataItem[]> {
    return this.dataService
      .getDataset(link)
      .pipe(switchMap((dataset) => dataset.read()))
  }

  onTableSelect(event) {
    console.log(event)
  }

  handleError(error: FetchError | Error) {
    if (error instanceof FetchError) {
      this.error = this.translateService.instant(
        `dataset.error.${error.type}`,
        {
          info: error.info,
        }
      )
      console.warn(error.message)
    } else {
      this.error = this.translateService.instant(error.message)
      console.warn(error.stack)
    }
    this.loading = false
  }
}
