import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import * as fromMap from './+state/map.reducer.js'
import { MapFacade } from './+state/map.facade.js'
import { GEOCODING_PROVIDER, GeocodingProvider } from './geocoding.service.js'

@NgModule({
  imports: [
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.mapReducer),
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
