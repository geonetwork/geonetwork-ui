import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { MapFacade } from '../+state/map.facade.js'
import { MapContext } from '@geospatial-sdk/core'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { CommonModule } from '@angular/common'
import { Feature } from 'geojson'

@Component({
  selector: 'gn-ui-map-state-container',
  templateUrl: './map-state-container.component.html',
  styleUrls: ['./map-state-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MapContainerComponent, CommonModule],
})
export class MapStateContainerComponent {
  private mapFacade = inject(MapFacade)

  context$: Observable<MapContext> = this.mapFacade.context$

  handleFeaturesClicked(features: Feature[]) {
    if (!features.length) {
      this.mapFacade.clearFeatureSelection()
      return
    }
    this.mapFacade.selectFeatures(features)
  }
}
