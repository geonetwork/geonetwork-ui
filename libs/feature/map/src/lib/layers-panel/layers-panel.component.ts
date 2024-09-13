import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MapFacade } from '../+state/map.facade'
import { firstValueFrom, map } from 'rxjs'
import { MapContextLayer } from '@geospatial-sdk/core'
import { MatIconModule } from '@angular/material/icon'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { MatTabsModule } from '@angular/material/tabs'
import { AddLayerFromOgcApiComponent } from '../add-layer-from-ogc-api/add-layer-from-ogc-api.component'
import { AddLayerFromWfsComponent } from '../add-layer-from-wfs/add-layer-from-wfs.component'
import { AddLayerFromWmsComponent } from '../add-layer-from-wms/add-layer-from-wms.component'
import { AddLayerFromCatalogComponent } from '../add-layer-from-catalog/add-layer-from-catalog.component'
import { AddLayerFromFileComponent } from '../add-layer-from-file/add-layer-from-file.component'
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    UiLayoutModule,
    MatTabsModule,
    AddLayerFromOgcApiComponent,
    AddLayerFromWfsComponent,
    AddLayerFromWmsComponent,
    AddLayerFromCatalogComponent,
    AddLayerFromFileComponent,
    TranslateModule,
    CommonModule,
  ],
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
