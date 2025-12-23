import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from './state/index.js'
import { MdViewEffects } from './state/mdview.effects.js'
import {
  METADATA_VIEW_FEATURE_STATE_KEY,
  reducer,
} from './state/mdview.reducer.js'

@NgModule({
  imports: [
    StoreModule.forFeature(METADATA_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
    FeatureMapModule,
  ],
  providers: [MdViewFacade],
})
export class FeatureRecordModule {}
