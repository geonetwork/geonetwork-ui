import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, Observable, of } from 'rxjs'
import {
  catchError,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators'
import { DataItem } from '@geonetwork-ui/data-fetcher'
import { DataService } from '../service/data.service'
import { TableItemModel } from '@geonetwork-ui/ui/dataviz'

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
          this.error = error.message
          console.warn(error.stack || error.message)
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

  constructor(private dataService: DataService) {}

  fetchData(link: MetadataLink): Observable<DataItem[]> {
    return this.dataService
      .getDataset(link)
      .pipe(switchMap((dataset) => dataset.read()))
  }

  onTableSelect(event) {
    console.log(event)
  }
}
