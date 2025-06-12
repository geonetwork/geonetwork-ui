import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { NgIconsModule } from '@ng-icons/core'
import { FacetsModule } from './facets/facets.module'
import { RecordsMetricsComponent } from './records-metrics/records-metrics.component'
import { ResultsLayoutComponent } from './results-layout/results-layout.component'
import { ResultsListContainerComponent } from './results-list/results-list.container.component'
import { SortByComponent } from './sort-by/sort-by.component'
import { SearchEffects } from './state/effects'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer'
import { ResultsHitsContainerComponent } from './results-hits/results-hits.container.component'
import { SearchStateContainerDirective } from './state/container/search-state.container.directive'
import {
  AutocompleteComponent,
  ButtonComponent,
  DateRangeDropdownComponent,
  DropdownMultiselectComponent,
  DropdownSelectorComponent,
  ViewportIntersectorComponent,
} from '@geonetwork-ui/ui/inputs'
import { NgModule } from '@angular/core'
import { ErrorComponent, KindBadgeComponent } from '@geonetwork-ui/ui/elements'
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component'
import { SpinningLoaderComponent } from '@geonetwork-ui/ui/widgets'
import { FavoriteStarComponent } from './favorites/favorite-star/favorite-star.component'

@NgModule({
  declarations: [
    SortByComponent,
    ResultsLayoutComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
    ResultsHitsContainerComponent,
    SearchStateContainerDirective,
    FilterDropdownComponent,
  ],
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
      initialState,
    }),
    EffectsModule.forFeature([SearchEffects]),
    HttpClientModule,
    HttpClientXsrfModule,
    UiSearchModule,
    FacetsModule,
    AutocompleteComponent,
    SpinningLoaderComponent,
    ErrorComponent,
    FavoriteStarComponent,
    DateRangeDropdownComponent,
    NgIconsModule,
    KindBadgeComponent,
    DropdownSelectorComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
    ButtonComponent,
  ],
  exports: [
    SortByComponent,
    ResultsLayoutComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
    ResultsHitsContainerComponent,
    FacetsModule,
    SearchStateContainerDirective,
    FilterDropdownComponent,
  ],
})
export class FeatureSearchModule {}
