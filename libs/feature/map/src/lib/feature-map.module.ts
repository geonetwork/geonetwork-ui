import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import * as fromMap from './+state/map.reducer'
import { MapFacade } from './+state/map.facade'

@NgModule({
  imports: [
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.mapReducer),
  ],
  providers: [MapFacade],
})
export class FeatureMapModule {}
