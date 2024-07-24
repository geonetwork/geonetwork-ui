import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MapFacade } from '../+state/map.facade'
import { MapContext, MapContextLayerXyz } from '@geospatial-sdk/core'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { CommonModule } from '@angular/common'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'

export const DEFAULT_BASELAYER_CONTEXT: MapContextLayerXyz = {
  type: 'xyz',
  url: `https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
  attributions: `<span>© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a></span>`,
}

@Component({
  selector: 'gn-ui-map-state-container',
  templateUrl: './map-state-container.component.html',
  styleUrls: ['./map-state-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MapContainerComponent, CommonModule],
})
export class MapStateContainerComponent {
  context$: Observable<MapContext> = this.mapFacade.context$.pipe(
    map((context) => ({
      ...context,
      view: {
        center: [4, 42],
        zoom: 6,
      },
      layers: [DEFAULT_BASELAYER_CONTEXT, ...context.layers],
    }))
  )

  constructor(private mapFacade: MapFacade) {}

  handleFeaturesClicked(features: Feature[]) {
    if (!features.length) {
      this.mapFacade.clearFeatureSelection()
      return
    }
    const geojsonFeatures = new GeoJSON().writeFeaturesObject(features).features
    this.mapFacade.selectFeatures(geojsonFeatures)
  }
}
