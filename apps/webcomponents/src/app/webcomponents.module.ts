import { CommonModule } from '@angular/common'
import { DoBootstrap, Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import {
  TRANSLATE_GEONETWORK_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import {
  FeatureSearchModule,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { apiConfiguration, BaseComponent } from './components/base.component'
import { GnAggregatedRecordsComponent } from './components/gn-aggregated-records/gn-aggregated-records.component'
import { GnFacetsComponent } from './components/gn-facets/gn-facets.component'
import { GnResultsListComponent } from './components/gn-results-list/gn-results-list.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiSearchModule } from '@geonetwork-ui/ui/search'

const CUSTOM_ELEMENTS: [new (...args) => BaseComponent, string][] = [
  [GnFacetsComponent, 'gn-facets'],
  [GnResultsListComponent, 'gn-results-list'],
  [GnAggregatedRecordsComponent, 'gn-aggregated-records'],
]

@NgModule({
  declarations: [
    BaseComponent,
    GnFacetsComponent,
    GnResultsListComponent,
    GnAggregatedRecordsComponent,
  ],
  imports: [
    CommonModule,
    UiInputsModule,
    UiSearchModule,
    FeatureSearchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_GEONETWORK_CONFIG),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: Configuration,
      useValue: apiConfiguration,
    },
    SearchFacade,
  ],
})
export class WebcomponentsModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    CUSTOM_ELEMENTS.forEach((ceDefinition) => {
      const angularComponent = ceDefinition[0]
      const ceTagName = ceDefinition[1]

      const customElement = createCustomElement(angularComponent, {
        injector: this.injector,
      })
      if (!customElements.get(ceTagName)) {
        customElements.define(ceTagName, customElement)
      }
    })
  }
}
