import { CommonModule } from '@angular/common'
import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
  UiSearchModule,
} from '@geonetwork-ui/ui/search'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { DATAHUB_RESULTS_LAYOUT_CONFIG } from '../../../datahub/src/app/app.config'
import { RecordPreviewDatahubComponent } from '../../../datahub/src/app/home/search/record-preview-datahub/record-preview-datahub.component'
import { AppComponent } from './app.component'
import { apiConfiguration, BaseComponent } from './components/base.component'
import { GnAggregatedRecordsComponent } from './components/gn-aggregated-records/gn-aggregated-records.component'
import { GnFacetsComponent } from './components/gn-facets/gn-facets.component'
import { GnResultsListComponent } from './components/gn-results-list/gn-results-list.component'

const CUSTOM_ELEMENTS: [new (...args) => BaseComponent, string][] = [
  [GnFacetsComponent, 'gn-facets'],
  [GnResultsListComponent, 'gn-results-list'],
  [GnAggregatedRecordsComponent, 'gn-aggregated-records'],
]

@NgModule({
  exports: [
    BaseComponent,
    GnFacetsComponent,
    GnResultsListComponent,
    GnAggregatedRecordsComponent,
  ],
  declarations: [
    AppComponent,
    BaseComponent,
    GnFacetsComponent,
    GnResultsListComponent,
    GnAggregatedRecordsComponent,
    RecordPreviewDatahubComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UiInputsModule,
    UiSearchModule,
    UiElementsModule,
    FeatureSearchModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(),
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    MatIconModule,
  ],
  providers: [
    {
      provide: RESULTS_LAYOUT_CONFIG,
      useValue: {
        ...DEFAULT_RESULTS_LAYOUT_CONFIG,
        ...DATAHUB_RESULTS_LAYOUT_CONFIG,
      },
    },
    {
      provide: Configuration,
      useValue: apiConfiguration,
    },
  ],
  // bootstrap: [AppComponent],
})
export class WebcomponentsModule {
  constructor(private injector: Injector) {
    CUSTOM_ELEMENTS.forEach((ceDefinition) => {
      const angularComponent = ceDefinition[0]
      const ceTagName = ceDefinition[1]

      const customElement = createCustomElement(angularComponent, {
        injector,
      })
      if (!customElements.get(ceTagName)) {
        customElements.define(ceTagName, customElement)
      }
    })
  }

  // eslint-disable-next-line
  ngDoBootstrap() {}
}
