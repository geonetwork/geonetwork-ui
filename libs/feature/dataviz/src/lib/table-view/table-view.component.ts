import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  getFileFormat,
  MetadataLink,
  MetadataLinkType,
} from '@geonetwork-ui/util/shared'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import {
  catchError,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators'
import {
  DataItem,
  SupportedType,
  SupportedTypes,
} from '@geonetwork-ui/data-fetcher'
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
    if (link.type === MetadataLinkType.WFS) {
      return this.dataService
        .getGeoJsonDownloadUrlFromWfs(link.url, link.name)
        .pipe(switchMap((url) => this.dataService.readDataset(url, 'geojson')))
    } else if (link.type === MetadataLinkType.DOWNLOAD) {
      const format = getFileFormat(link)
      const supportedType =
        SupportedTypes.indexOf(format as any) > -1
          ? (format as SupportedType)
          : undefined
      return this.dataService.readDataset(link.url, supportedType)
    } else if (link.type === MetadataLinkType.ESRI_REST) {
      const url = this.dataService.getGeoJsonDownloadUrlFromEsriRest(link.url)
      return this.dataService.readDataset(url, 'geojson')
    }
    return throwError('protocol not supported')
  }

  onTableSelect(event) {
    console.log(event)
  }
}
