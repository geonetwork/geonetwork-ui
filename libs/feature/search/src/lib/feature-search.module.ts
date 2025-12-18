import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { SearchEffects } from './state/effects.js'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer.js'
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
