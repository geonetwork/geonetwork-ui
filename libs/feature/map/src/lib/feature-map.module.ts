import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { defaultMapOptions, FEATURE_MAP_OPTIONS } from './constant'
import { MapInstanceDirective } from './manager/map-instance.directive'
import { MapContextComponent } from './map-context/component/map-context.component'
import { LayersPanelComponent } from './layers-panel/layers-panel.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AddLayerFromCatalogComponent } from './add-layer-from-catalog/add-layer-from-catalog.component'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromMap from './+state/map.reducer'
import { MapEffects } from './+state/map.effects'
import { MapFacade } from './+state/map.facade'

@NgModule({
  declarations: [
    MapContextComponent,
    MapInstanceDirective,
    LayersPanelComponent,
    AddLayerFromCatalogComponent,
  ],
  exports: [
    MapContextComponent,
    MapInstanceDirective,
    LayersPanelComponent,
    AddLayerFromCatalogComponent,
  ],
  imports: [
    CommonModule,
    UiMapModule,
    UiLayoutModule,
    MatIconModule,
    MatTabsModule,
    TranslateModule,
    FeatureSearchModule,
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.mapReducer),
    EffectsModule.forFeature([MapEffects]),
  ],
  providers: [
    {
      provide: FEATURE_MAP_OPTIONS,
      useValue: defaultMapOptions,
    },
    MapFacade,
  ],
})
export class FeatureMapModule {}
