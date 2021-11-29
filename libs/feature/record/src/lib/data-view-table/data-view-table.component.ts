import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  DownloadFormatType,
  getDownloadFormat,
  getEsriRestDataUrl,
  LinkHelperService,
} from '@geonetwork-ui/feature/search'
import { SupportedType, SupportedTypes } from '@geonetwork-ui/data-fetcher'

marker('map.wfs.geojson.not.supported')

@Component({
  selector: 'gn-ui-data-view-table',
  templateUrl: './data-view-table.component.html',
  styleUrls: ['./data-view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewTableComponent {
  selectionId = 0
  compatibleDataLinks$ = combineLatest([
    this.mdViewFacade.dataLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(map(([dataLinks, geoDataLinks]) => [...dataLinks, ...geoDataLinks]))
  dropdownChoices$ = this.compatibleDataLinks$.pipe(
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
    this.compatibleDataLinks$,
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
              this.proxy.getProxiedUrl(
                endpoint.getFeatureUrl(link.name, {
                  outputCrs: 'EPSG:4326',
                  asJson: true,
                })
              ),
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
      const format = getDownloadFormat(link, DownloadFormatType.FILE)
      const supportedType =
        SupportedTypes.indexOf(format as any) > -1
          ? (format as SupportedType)
          : undefined
      return fromPromise(
        readDataset(this.proxy.getProxiedUrl(link.url), supportedType).then(
          (features) =>
            features.map((f) => ({
              id: f.id,
              ...f.properties,
            }))
        )
      )
    } else if (this.linkHelper.isEsriRestFeatureServer(link)) {
      const url = getEsriRestDataUrl(link, 'geojson')
      return fromPromise(
        readDataset(this.proxy.getProxiedUrl(url), 'geojson').then((features) =>
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
