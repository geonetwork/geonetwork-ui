import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MapFacade } from '../+state/map.facade'
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
  layers$ = this.mapFacade.layers$
  ogcUrl = ''
  constructor(private mapFacade: MapFacade) {}

  deleteLayer(index: number) {
    this.mapFacade.removeLayer(index)
  }

  addLayer(layer) {
    this.mapFacade.addLayer(layer)
  }
}
