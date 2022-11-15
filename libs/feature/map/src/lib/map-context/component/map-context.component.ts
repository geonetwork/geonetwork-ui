import { Component, EventEmitter, Input, Output } from '@angular/core'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'
import { MapConfig } from '@geonetwork-ui/util/app-config'
import { MapContext, FeaturesClickedEvent } from 'native-map'
import 'native-map' // define custom element

@Component({
  selector: 'gn-ui-map-context',
  templateUrl: './map-context.component.html',
  styleUrls: ['./map-context.component.css'],
})
export class MapContextComponent {
  @Input() context: MapContext
  @Input() mapConfig: MapConfig // TODO: use this
  @Output() featuresClicked = new EventEmitter<Feature<Geometry>[]>()

  handleFeaturesClicked(event: FeaturesClickedEvent) {
    const featuresArray = event.detail.features as any // FIXME: fix typing
    this.featuresClicked.emit(featuresArray.flat(1))
  }
}
