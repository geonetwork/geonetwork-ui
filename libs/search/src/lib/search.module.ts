import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer'
import { SortByComponent } from './sort-by/sort-by.component'
import { UiModule } from '@lib/ui'
import { CommonModule } from '@angular/common'
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search.component'
import { SearchEffects } from './state/effects'
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { ResultsListComponent } from './results-list/results-list.component'
import { GnApiModule } from '@lib/gn-api'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [SortByComponent, FuzzySearchComponent, ResultsListComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
      initialState,
    }),
    EffectsModule.forFeature([SearchEffects]),
    HttpClientModule,
    HttpClientXsrfModule,
    UiModule,
    GnApiModule,
  ],
  exports: [SortByComponent, FuzzySearchComponent, ResultsListComponent],
})
export class LibSearchModule {}
