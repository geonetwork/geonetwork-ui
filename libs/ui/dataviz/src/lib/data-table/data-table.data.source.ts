import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable } from 'rxjs'
import { DataItem } from '@geonetwork-ui/data-fetcher'
import { map } from 'rxjs/operators'
import { TableItemModel } from './data-table.component'

export class DataTableDataSource implements DataSource<TableItemModel> {
  private dataItems$ = new BehaviorSubject<DataItem[]>([])

  connect(): Observable<TableItemModel[]> {
    return this.dataItems$.asObservable().pipe(
      map((items) =>
        items.map((item) => ({
          id: item.id,
          ...item.properties,
        }))
      )
    )
  }

  disconnect(): void {
    this.dataItems$.complete()
  }

  async showData(itemsPromise: Promise<DataItem[]>) {
    const items = await itemsPromise
    this.dataItems$.next(items)
  }

  clearData() {
    this.dataItems$.next([])
  }
}
