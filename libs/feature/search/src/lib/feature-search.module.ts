import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { SearchEffects } from './state/effects'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
      initialState,
    }),
    EffectsModule.forFeature([SearchEffects]),
  ],
})
export class FeatureSearchModule {}
