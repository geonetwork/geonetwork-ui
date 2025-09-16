import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from './state'
import { MdViewEffects } from './state/mdview.effects'
import {
  METADATA_VIEW_FEATURE_STATE_KEY,
  reducer,
} from './state/mdview.reducer'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'

@NgModule({
  imports: [
    StoreModule.forFeature(METADATA_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
    FeatureMapModule,
    FeatureCatalogModule,
  ],
  providers: [MdViewFacade],
})
export class FeatureRecordModule {}
