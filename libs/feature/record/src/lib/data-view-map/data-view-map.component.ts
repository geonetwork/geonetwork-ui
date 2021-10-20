import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  MAP_CTX_LAYER_XYZ_FIXTURE,
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
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
import { map, switchMap, tap } from 'rxjs/operators'
import { MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { readDataset } from '@geonetwork-ui/data-fetcher'
import { fromPromise } from 'rxjs/internal-compatibility'

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
  currentLayers$ = combineLatest([
    this.compatibleMapLinks$,
    this.selectedLinkIndex$,
  ]).pipe(
    map(([links, index]) => links[index]),
    switchMap((link) => {
      if (!link) {
        return of([this.getBackgroundLayer()])
      }
      return this.getLayerFromLink(link).pipe(
        map((layer) => [this.getBackgroundLayer(), layer])
      )
    })
  )
  mapContext$ = this.currentLayers$.pipe(
    map(
      (layers) =>
        ({
          layers,
          view: {
            center: fromLonLat([2.1, 46.8], 'EPSG:3857'),
            zoom: 5,
          },
        } as MapContextModel)
    )
  )

  constructor(private mdViewFacade: MdViewFacade) {}

  getBackgroundLayer(): MapContextLayerModel {
    return MAP_CTX_LAYER_XYZ_FIXTURE
  }

  getLayerFromLink(link: MetadataLinkValid): Observable<MapContextLayerModel> {
    if (link.protocol === 'OGC:WMS' || link.protocol === 'OGC:WFS') {
      return of({
        url: link.url,
        type:
          link.protocol === 'OGC:WMS'
            ? MapContextLayerTypeEnum.WMS
            : MapContextLayerTypeEnum.WFS,
        name: link.name,
      })
    } else if (link.protocol?.startsWith('WWW:DOWNLOAD')) {
      return fromPromise(
        readDataset(link.url).then((features) => ({
          type: MapContextLayerTypeEnum.GEOJSON,
          data: {
            type: 'FeatureCollection',
            features,
          },
        }))
      )
    }
    return throwError('protocol not supported')
  }

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }
}
