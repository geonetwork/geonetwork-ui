import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MapFacade } from '../+state/map.facade'
import { firstValueFrom, map } from 'rxjs'
import { MapContextLayer } from '@geospatial-sdk/core'

@Component({
  selector: 'gn-ui-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayersPanelComponent {
  layers$ = this.mapFacade.context$.pipe(map((context) => context.layers))
  ogcUrl = ''
  constructor(private mapFacade: MapFacade) {}

  async deleteLayer(index: number) {
    const context = await firstValueFrom(this.mapFacade.context$)
    this.mapFacade.applyContext({
      ...context,
      layers: context.layers.filter((_, i) => i !== index),
    })
  }

  async addLayer(layer: MapContextLayer) {
    const context = await firstValueFrom(this.mapFacade.context$)
    this.mapFacade.applyContext({
      ...context,
      layers: [...context.layers, layer],
    })
  }
}
