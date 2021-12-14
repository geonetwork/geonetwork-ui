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
import { MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { LinkHelperService } from '@geonetwork-ui/feature/search'
import { DataService } from '../service/data.service'

@Component({
  selector: 'gn-ui-data-view-map',
  templateUrl: './data-view-map.component.html',
  styleUrls: ['./data-view-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewMapComponent {
  compatibleMapLinks$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinks]) => [...mapApiLinks, ...geoDataLinks])
  )

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

  mapContext$ = this.currentLayers$.pipe(
    switchMap((layers) =>
      this.mapUtils.getLayerExtent(layers[1]).pipe(
        catchError((error) => {
          console.warn(error) // FIXME: report this to the user somehow
          return of(undefined)
        }),
        map((extent) =>
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
    )
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private mapUtils: MapUtilsService,
    private linkHelper: LinkHelperService,
    private dataService: DataService
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
      return this.dataService
        .getGeoJsonDownloadUrlFromWfs(link.url, link.name)
        .pipe(
          switchMap((url) => this.dataService.readGeoJsonDataset(url)),
          map((data) => ({
            type: MapContextLayerTypeEnum.GEOJSON,
            data,
          }))
        )
    } else if (this.linkHelper.hasProtocolDownload(link)) {
      return this.dataService.readGeoJsonDataset(link.url).pipe(
        map((data) => ({
          type: MapContextLayerTypeEnum.GEOJSON,
          data,
        }))
      )
    } else if (this.linkHelper.isEsriRestFeatureServer(link)) {
      const url = this.dataService.getGeoJsonDownloadUrlFromEsriRest(link.url)
      return this.dataService.readGeoJsonDataset(url).pipe(
        map((data) => ({
          type: MapContextLayerTypeEnum.GEOJSON,
          data,
        }))
      )
    }
    return throwError('protocol not supported')
  }

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }
}
