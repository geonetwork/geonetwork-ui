import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { defaultMapOptions, FEATURE_MAP_OPTIONS } from './constant'
import { MapInstanceDirective } from './manager/map-instance.directive'
import { MapContextComponent } from './map-context/component/map-context.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { TranslateModule } from '@ngx-translate/core'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromMap from './+state/map.reducer'
import { MapEffects } from './+state/map.effects'
import { MapFacade } from './+state/map.facade'
import { MapContainerComponent } from './map-container/map-container.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { TextInputComponent, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { GeocodingComponent } from './geocoding/geocoding.component'
import { GEOCODING_PROVIDER, GeocodingProvider } from './geocoding.service'
import { AddLayerFromOgcApiComponent } from './add-layer-from-ogc-api/add-layer-from-ogc-api.component'

@NgModule({
  declarations: [
    MapContextComponent,
    MapInstanceDirective,
    MapContainerComponent,
    GeocodingComponent,
  ],
  exports: [
    MapContextComponent,
    MapInstanceDirective,
    MapContainerComponent,
    GeocodingComponent,
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
    UiElementsModule,
    UiInputsModule,
    AddLayerFromOgcApiComponent,
    TextInputComponent,
  ],
  providers: [
    {
      provide: FEATURE_MAP_OPTIONS,
      useValue: defaultMapOptions,
    },
    MapFacade,
    {
      provide: GEOCODING_PROVIDER,
      useValue: ['geonames', { maxRows: 5 }] as GeocodingProvider,
    },
  ],
})
export class FeatureMapModule {}
