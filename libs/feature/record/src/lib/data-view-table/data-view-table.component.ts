import { Component, ChangeDetectionStrategy } from '@angular/core'
import { readDataset } from '@geonetwork-ui/data-fetcher'
import { MetadataLinkValid, ProxyService } from '@geonetwork-ui/util/shared'
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  throwError,
} from 'rxjs'
import { fromPromise } from 'rxjs/internal-compatibility'
import {
  catchError,
  finalize,
  map,
  switchMap,
  tap,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  getEsriRestDataUrl,
  LinkHelperService,
} from '@geonetwork-ui/feature/search'

marker('map.wfs.geojson.not.supported')

@Component({
  selector: 'gn-ui-data-view-table',
  templateUrl: './data-view-table.component.html',
  styleUrls: ['./data-view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewTableComponent {
  selectionId = 0
  dropdownChoices$ = this.mdViewFacade.dataLinks$.pipe(
    map((links) =>
      links.map((link, index) => ({
        label: link.description || link.name,
        value: index,
      }))
    )
  )
  selectedLinkIndex$ = new BehaviorSubject(0)

  loading = false
  error = null

  tableData$ = combineLatest([
    this.mdViewFacade.dataLinks$,
    this.selectedLinkIndex$.pipe(distinctUntilChanged()),
  ]).pipe(
    map(([links, index]) => links[index]),
    switchMap((link) => {
      this.loading = true
      this.error = null
      return this.fetchData(link).pipe(
        catchError((error) => {
          this.error = error.message
          return of([])
        }),
        finalize(() => {
          this.loading = false
        })
      )
    }),
    shareReplay(1)
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private linkHelper: LinkHelperService,
    private proxy: ProxyService
  ) {}

  fetchData(link: MetadataLinkValid): Observable<{ id: string | number }[]> {
    if (this.linkHelper.isWfsLink(link)) {
      return fromPromise(
        new WfsEndpoint(this.proxy.getProxiedUrl(link.url))
          .isReady()
          .then((endpoint) => {
            if (!endpoint.supportsJson(link.name)) {
              throw new Error('map.wfs.geojson.not.supported')
            }
            return readDataset(
              endpoint.getFeatureUrl(link.name, {
                outputCrs: 'EPSG:4326',
                asJson: true,
              }),
              'geojson'
            ).then((features) =>
              features.map((f) => ({
                id: f.id,
                ...f.properties,
              }))
            )
          })
      )
    } else if (this.linkHelper.hasProtocolDownload(link)) {
      return fromPromise(
        readDataset(link.url).then((features) =>
          features.map((f) => ({
            id: f.id,
            ...f.properties,
          }))
        )
      )
    } else if (this.linkHelper.isEsriRestFeatureServer(link)) {
      const url = getEsriRestDataUrl(link, 'geojson')
      return fromPromise(
        readDataset(url, 'geojson').then((features) =>
          features.map((f) => ({
            id: f.id,
            ...f.properties,
          }))
        )
      )
    }
    return throwError('protocol not supported')
  }

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }

  onTableSelect(event) {
    console.log(event)
  }
}
