import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { GnApiModule } from '@lib/gn-api'
import { UiModule } from '@lib/ui'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import { FacetsModule } from './facets/facets.module'
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search.component'
import { RecordsMetricsComponent } from './records-metrics/records-metrics.component'
import { ResultsLayoutComponent } from './results-layout/results-layout.component'
import { ResultsListContainerComponent } from './results-list/results-list.container.component'
import { SortByComponent } from './sort-by/sort-by.component'
import { SearchEffects } from './state/effects'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer'

@NgModule({
  declarations: [
    SortByComponent,
    ResultsLayoutComponent,
    FuzzySearchComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
  ],
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
    FacetsModule,
  ],
  exports: [
    SortByComponent,
    ResultsLayoutComponent,
    FuzzySearchComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
    FacetsModule,
  ],
})
export class LibSearchModule {}
