import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { StoreModule } from '@ngrx/store'
import * as fromMap from './+state/map.reducer'
import { MapFacade } from './+state/map.facade'
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { GEOCODING_PROVIDER, GeocodingProvider } from './geocoding.service'
import { AddLayerFromOgcApiComponent } from './add-layer-from-ogc-api/add-layer-from-ogc-api.component'

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateDirective,
    TranslatePipe,
    FeatureSearchModule,
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.mapReducer),
    AddLayerFromOgcApiComponent,
    TextInputComponent,
  ],
  providers: [
    MapFacade,
    {
      provide: GEOCODING_PROVIDER,
      useValue: ['geonames', { maxRows: 5 }] as GeocodingProvider,
    },
  ],
})
export class FeatureMapModule {}
