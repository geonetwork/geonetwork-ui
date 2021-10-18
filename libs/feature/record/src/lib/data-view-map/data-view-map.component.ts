import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  MAP_CTX_LAYER_XYZ_FIXTURE,
  MapContextModel,
} from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import { fromLonLat } from 'ol/proj'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-data-view-map',
  templateUrl: './data-view-map.component.html',
  styleUrls: ['./data-view-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewMapComponent {
  dropdownChoices$ = this.mdViewFacade.mapApiLinks$.pipe(
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
    this.mdViewFacade.mapApiLinks$,
    this.selectedLinkIndex$,
  ]).pipe(
    map(([links, index]) => links[index]),
    map((link) =>
      link
        ? [
            this.getBackgroundLayer(),
            {
              url: link.url,
              type: link.protocol === 'OGC:WMS' ? 'wms' : 'geojson',
              name: link.name,
            },
          ]
        : [this.getBackgroundLayer()]
    )
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

  getBackgroundLayer() {
    return MAP_CTX_LAYER_XYZ_FIXTURE
  }

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }
}
