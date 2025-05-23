import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MapFacade } from '../+state/map.facade'
import { firstValueFrom, map } from 'rxjs'
import { MapContextLayer } from '@geospatial-sdk/core'
import { ExpandablePanelButtonComponent } from '@geonetwork-ui/ui/layout'
import { MatTabsModule } from '@angular/material/tabs'
import { AddLayerFromOgcApiComponent } from '../add-layer-from-ogc-api/add-layer-from-ogc-api.component'
import { AddLayerFromWfsComponent } from '../add-layer-from-wfs/add-layer-from-wfs.component'
import { AddLayerFromWmsComponent } from '../add-layer-from-wms/add-layer-from-wms.component'
import { AddLayerFromCatalogComponent } from '../add-layer-from-catalog/add-layer-from-catalog.component'
import { AddLayerFromFileComponent } from '../add-layer-from-file/add-layer-from-file.component'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matAddCircleOutlineOutline,
  matLayersOutline,
} from '@ng-icons/material-icons/outline'
import { matChevronRight } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTabsModule,
    AddLayerFromOgcApiComponent,
    AddLayerFromWfsComponent,
    AddLayerFromWmsComponent,
    AddLayerFromCatalogComponent,
    AddLayerFromFileComponent,
    TranslateDirective,
    TranslatePipe,
    CommonModule,
    NgIconComponent,
    ExpandablePanelButtonComponent,
  ],
  providers: [
    provideIcons({
      matLayersOutline,
      matAddCircleOutlineOutline,
      matChevronRight,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
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
