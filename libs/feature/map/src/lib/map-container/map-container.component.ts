import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MapFacade } from '../+state/map.facade'
import { MapContextModel } from '../map-context/map-context.model'
import { DEFAULT_BASELAYER_CONTEXT } from '../map-context/map-context.service'

@Component({
  selector: 'gn-ui-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContainerComponent {
  context$: Observable<MapContextModel> = this.mapFacade.layers$.pipe(
    map((layers) => ({
      view: {
        center: [4, 42],
        zoom: 6,
      },
      layers: [DEFAULT_BASELAYER_CONTEXT, ...layers],
    }))
  )

  constructor(private mapFacade: MapFacade) {}
}
