import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
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
import { TableComponent, TableItemModel } from '@geonetwork-ui/ui/dataviz'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import {
  LoadingMaskComponent,
  PopupAlertComponent,
} from '@geonetwork-ui/ui/widgets'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TableComponent,
    LoadingMaskComponent,
    PopupAlertComponent,
    TranslateModule,
  ],
  standalone: true,
})
export class TableViewComponent {
  @Input() set link(value: DatasetOnlineResource) {
    this.currentLink$.next(value)
  }
  @Input() paginate = false
  private currentLink$ = new BehaviorSubject<DatasetOnlineResource>(null)

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

  fetchData(link: DatasetOnlineResource): Observable<DataItem[]> {
    return this.dataService
      .getDataset(link)
      .pipe(switchMap((dataset) => dataset.read()))
  }

  onTableSelect(event) {
    console.log(event)
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
    this.loading = false
  }
}
