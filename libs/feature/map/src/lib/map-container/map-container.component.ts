import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MapFacade } from '../+state/map.facade'
import {
  MapContextModel,
  MapContextViewModel,
} from '../map-context/map-context.model'

@Component({
  selector: 'gn-ui-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContainerComponent {
  view: MapContextViewModel = {
    center: [4, 42],
    zoom: 6,
  }
  context$: Observable<MapContextModel> = this.mapFacade.layers$.pipe(
    map((layers) => ({
      view: this.view,
      layers,
    }))
  )

  constructor(private mapFacade: MapFacade) {}
}
