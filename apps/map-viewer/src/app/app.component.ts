import { Component } from '@angular/core'
import {
  MapContextLayerTypeEnum,
  MapContextModel,
} from '@geonetwork-ui/feature/map'

@Component({
  selector: 'map-viewer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  context: MapContextModel = {
    view: {
      center: [4, 42],
      zoom: 6,
    },
    layers: [
      {
        type: MapContextLayerTypeEnum.XYZ,
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
    ],
  }
}
