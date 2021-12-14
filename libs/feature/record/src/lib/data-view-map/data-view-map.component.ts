import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  FeatureInfoService,
  MAP_CTX_LAYER_XYZ_FIXTURE,
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapStyleService,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import { LinkHelperService } from '@geonetwork-ui/feature/search'
import { getThemeConfig, isConfigLoaded } from '@geonetwork-ui/util/app-config'
import { MetadataLinkValid, ProxyService } from '@geonetwork-ui/util/shared'
import { Feature } from 'ol'
import { Geometry } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import Style from 'ol/style/Style'
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs'
import {
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
} from 'rxjs/operators'
import { DataService } from '../service/data.service'
import { MdViewFacade } from '../state/mdview.facade'

@Component({
  selector: 'gn-ui-data-view-map',
  templateUrl: './data-view-map.component.html',
  styleUrls: ['./data-view-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewMapComponent implements OnInit, OnDestroy {
  selection: Feature<Geometry>
  private subscription = new Subscription()
  private selectionStyle: Style[]

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
    private dataService: DataService,
    private proxy: ProxyService,
    private featureInfo: FeatureInfoService,
    private changeRef: ChangeDetectorRef,
    private styleService: MapStyleService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.selectionStyle = this.styleService.createDefaultStyle({
      color: isConfigLoaded() ? getThemeConfig().SECONDARY_COLOR : 'red',
      width: 3,
    })
    this.featureInfo.handleFeatureInfo()
    this.subscription.add(
      this.featureInfo.features$.subscribe((features) => {
        this.onMapFeatureSelect(features)
      })
    )
  }

  onMapFeatureSelect(features: Feature<Geometry>[]): void {
    this.resetSelection()
    this.selection = features?.length > 0 && features[0]
    if (this.selection) {
      this.selection.setStyle(this.selectionStyle)
    }
    this.changeRef.detectChanges()
  }

  resetSelection(): void {
    if (this.selection) {
      this.selection.setStyle(null)
    }
    this.selection = null
  }

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
