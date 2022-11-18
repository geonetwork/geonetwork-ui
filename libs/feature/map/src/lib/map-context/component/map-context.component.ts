import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'
import { MapConfig } from '@geonetwork-ui/util/app-config'
import { FeaturesClickedEvent, MapContext, NativeMapElement } from 'native-map'
import 'native-map'

@Component({
  selector: 'gn-ui-map-context',
  templateUrl: './map-context.component.html',
  styleUrls: ['./map-context.component.css'],
})
export class MapContextComponent {
  @Input() context: MapContext
  @Input() mapConfig: MapConfig // TODO: use this
  @Output() featuresClicked = new EventEmitter<Feature<Geometry>[]>()
  @ViewChild('nativeMap') mapRef: ElementRef<NativeMapElement>

  get view() {
    return this.mapRef.nativeElement.olView
  }
  get layers() {
    return this.mapRef.nativeElement.olLayers
  }

  handleFeaturesClicked(event: FeaturesClickedEvent) {
    const featuresArray = event.detail.features
    this.featuresClicked.emit(featuresArray.flat(1))
  }
}
