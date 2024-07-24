import { Component } from '@angular/core'
import { MapContext } from '@geospatial-sdk/core'

@Component({
  selector: 'map-viewer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  context: MapContext = {
    view: {
      center: [4, 42],
      zoom: 6,
    },
    layers: [
      {
        type: 'xyz',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
    ],
  }
}
