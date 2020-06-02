import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer'
import { SortByComponent } from './sort-by/sort-by.component'
import { UiModule } from '@lib/ui'
import { CommonModule } from '@angular/common'
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search.component'
import { SearchEffects } from '@lib/search'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  declarations: [SortByComponent, FuzzySearchComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
      initialState,
    }),
    EffectsModule.forFeature([SearchEffects]),
    UiModule,
  ],
  exports: [SortByComponent, FuzzySearchComponent],
})
export class LibSearchModule {}
