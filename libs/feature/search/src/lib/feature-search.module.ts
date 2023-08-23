import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
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
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { InjectionToken, NgModule } from '@angular/core'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { FavoriteStarComponent } from './favorites/favorite-star/favorite-star.component'
import { MatIconModule } from '@angular/material/icon'
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component'
import { Geometry } from 'geojson'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'
import { Gn4Repository } from '@geonetwork-ui/api/repository/gn4'

// this geometry will be used to filter & boost results accordingly
export const FILTER_GEOMETRY = new InjectionToken<Promise<Geometry>>(
  'filter-geometry'
)

// expects the replacement key ${uuid}
export const RECORD_URL_TOKEN = new InjectionToken<string>('record-url-token')

@NgModule({
  declarations: [
    SortByComponent,
    ResultsLayoutComponent,
    FuzzySearchComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
    ResultsHitsContainerComponent,
    SearchStateContainerDirective,
    FavoriteStarComponent,
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
    ApiModule,
    FacetsModule,
    MatIconModule,
    UiWidgetsModule,
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
    FavoriteStarComponent,
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
