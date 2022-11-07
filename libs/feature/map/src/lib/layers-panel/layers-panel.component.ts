import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MapFacade } from '../+state/map.facade'

@Component({
  selector: 'gn-ui-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayersPanelComponent {
  layers$ = this.mapFacade.layers$
  constructor(private mapFacade: MapFacade) {}

  deleteLayer(index: number) {
    this.mapFacade.removeLayer(index)
  }
}
