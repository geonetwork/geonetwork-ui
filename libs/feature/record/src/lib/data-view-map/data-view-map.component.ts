import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  MAP_CTX_LAYER_XYZ_FIXTURE,
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import { fromLonLat } from 'ol/proj'
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  throwError,
} from 'rxjs'
import {
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
} from 'rxjs/operators'
import { MetadataLinkValid, ProxyService } from '@geonetwork-ui/util/shared'
import { readDataset } from '@geonetwork-ui/data-fetcher'
import { fromPromise } from 'rxjs/internal-compatibility'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import {
  getEsriRestDataUrl,
  LinkHelperService,
} from '@geonetwork-ui/feature/search'

@Component({
  selector: 'gn-ui-data-view-map',
  templateUrl: './data-view-map.component.html',
  styleUrls: ['./data-view-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewMapComponent {
  compatibleMapLinks$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.dataLinks$,
  ]).pipe(map(([mapApiLinks, dataLinks]) => [...mapApiLinks, ...dataLinks]))

  dropdownChoices$ = this.compatibleMapLinks$.pipe(
    map((links) =>
      links.length
        ? links.map((link, index) => ({
            label: `${link.name} (${link.protocol})`,
            value: index,
          }))
        : [{ label: 'No preview layer', value: 0 }]
    )
  )
  selectedLinkIndex$ = new BehaviorSubject(0)

  loading = false
  error = null

  currentLayers$ = combineLatest([
    this.compatibleMapLinks$,
    this.selectedLinkIndex$.pipe(distinctUntilChanged()),
  ]).pipe(
    map(([links, index]) => links[index]),
    switchMap((link) => {
      if (!link) {
        return of([this.getBackgroundLayer()])
      }
      this.loading = true
      this.error = null
      return this.getLayerFromLink(link).pipe(
        map((layer) => [this.getBackgroundLayer(), layer]),
        catchError((e) => {
          this.error = e.message
          return of([this.getBackgroundLayer()])
        }),
        finalize(() => (this.loading = false))
      )
    })
  )

  mapExtent$ = this.currentLayers$.pipe(
    switchMap((layers) =>
      this.mapUtils.getLayerExtent(layers[1]).pipe(
        catchError((e) => {
          this.error = e.message
          return of(undefined)
        })
      )
    )
  )

  mapContext$ = combineLatest([this.currentLayers$, this.mapExtent$]).pipe(
    map(([layers, extent]) =>
      extent
        ? ({
            layers,
            extent,
          } as MapContextModel)
        : ({
            layers,
            view: {
              center: fromLonLat([2.1, 46.8], 'EPSG:3857'),
              zoom: 5,
            },
          } as MapContextModel)
    )
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private mapUtils: MapUtilsService,
    private linkHelper: LinkHelperService,
    private proxy: ProxyService
  ) {}

  getBackgroundLayer(): MapContextLayerModel {
    return MAP_CTX_LAYER_XYZ_FIXTURE
  }

  getLayerFromLink(link: MetadataLinkValid): Observable<MapContextLayerModel> {
    if (this.linkHelper.isWmsLink(link)) {
      return of({
        url: link.url,
        type: MapContextLayerTypeEnum.WMS,
        name: link.name,
      })
    } else if (this.linkHelper.isWfsLink(link)) {
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
                  asJson: true,
                  outputCrs: 'EPSG:4326',
                })
              ),
              'geojson'
            ).then((features) => ({
              type: MapContextLayerTypeEnum.GEOJSON,
              data: {
                type: 'FeatureCollection',
                features,
              },
            }))
          })
      )
    } else if (this.linkHelper.hasProtocolDownload(link)) {
      return fromPromise(
        readDataset(this.proxy.getProxiedUrl(link.url), 'geojson').then(
          (features) => ({
            type: MapContextLayerTypeEnum.GEOJSON,
            data: {
              type: 'FeatureCollection',
              features,
            },
          })
        )
      )
    } else if (this.linkHelper.isEsriRestFeatureServer(link)) {
      const url = getEsriRestDataUrl(link, 'geojson')
      return fromPromise(
        readDataset(this.proxy.getProxiedUrl(url), 'geojson').then(
          (features) => ({
            type: MapContextLayerTypeEnum.GEOJSON,
            data: {
              type: 'FeatureCollection',
              features,
            },
          })
        )
      )
    }
    return throwError('protocol not supported')
  }

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }
}
