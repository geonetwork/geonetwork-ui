import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
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
import { ResultsHitsContainerComponent } from './results-hits-number/results-hits.container.component'
import { SearchStateContainerDirective } from './state/container/search-state.container.directive'
import {
  AutocompleteComponent,
  DateRangeDropdownComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { NgModule } from '@angular/core'
import { ErrorComponent, UiElementsModule } from '@geonetwork-ui/ui/elements'
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component'
import {
  SpinningLoaderComponent,
  UiWidgetsModule,
} from '@geonetwork-ui/ui/widgets'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Gn4Repository } from '@geonetwork-ui/api/repository'
import { FavoriteStarComponent } from './favorites/favorite-star/favorite-star.component'

@NgModule({
  declarations: [
    SortByComponent,
    ResultsLayoutComponent,
    FuzzySearchComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
    ResultsHitsContainerComponent,
    SearchStateContainerDirective,
    FilterDropdownComponent,
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
    UiSearchModule,
    UiInputsModule,
    UiElementsModule,
    FacetsModule,
    UiWidgetsModule,
    AutocompleteComponent,
    SpinningLoaderComponent,
    ErrorComponent,
    FavoriteStarComponent,
    DateRangeDropdownComponent,
  ],
  exports: [
    SortByComponent,
    ResultsLayoutComponent,
    FuzzySearchComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
    ResultsHitsContainerComponent,
    FacetsModule,
    SearchStateContainerDirective,
    FilterDropdownComponent,
  ],
  providers: [
    {
      provide: RecordsRepositoryInterface,
      useClass: Gn4Repository,
    },
  ],
})
export class FeatureSearchModule {}
