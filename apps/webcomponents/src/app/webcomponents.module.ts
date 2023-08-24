import { OverlayContainer } from '@angular/cdk/overlay'
import { Platform } from '@angular/cdk/platform'
import { CommonModule, DOCUMENT } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { AppComponent } from './app.component'
import { AppOverlayContainer } from './AppOverlayContainer'
import { apiConfiguration, BaseComponent } from './components/base.component'
import { GnAggregatedRecordsComponent } from './components/gn-aggregated-records/gn-aggregated-records.component'
import { GnFacetsComponent } from './components/gn-facets/gn-facets.component'
import { GnResultsListComponent } from './components/gn-results-list/gn-results-list.component'
import { GnSearchInputComponent } from './components/gn-search-input/gn-search-input.component'
import { GnDatasetViewTableComponent } from './components/gn-dataset-view-table/gn-dataset-view-table.component'
import { GnMapViewerComponent } from './components/gn-map-viewer/gn-map-viewer.component'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { GnDatasetViewChartComponent } from './components/gn-dataset-view-chart/gn-dataset-view-chart.component'
import { FeatureDatavizModule } from '@geonetwork-ui/feature/dataviz'
import { EmbeddedTranslateLoader } from '@geonetwork-ui/util/i18n'

const CUSTOM_ELEMENTS: [new (...args) => BaseComponent, string][] = [
  [GnFacetsComponent, 'gn-facets'],
  [GnResultsListComponent, 'gn-results-list'],
  [GnAggregatedRecordsComponent, 'gn-aggregated-records'],
  [GnSearchInputComponent, 'gn-search-input'],
  [GnDatasetViewTableComponent, 'gn-dataset-view-table'],
  [GnDatasetViewChartComponent, 'gn-dataset-view-chart'],
  [GnMapViewerComponent, 'gn-map-viewer'],
]

@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    BaseComponent,
    GnFacetsComponent,
    GnResultsListComponent,
    GnAggregatedRecordsComponent,
    GnSearchInputComponent,
    GnDatasetViewTableComponent,
    GnDatasetViewChartComponent,
    GnMapViewerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UiInputsModule,
    UiSearchModule,
    UiElementsModule,
    FeatureSearchModule,
    FeatureRecordModule,
    FeatureMapModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(),
    UtilI18nModule,
    TranslateModule.forRoot({
      ...TRANSLATE_DEFAULT_CONFIG,
      loader: {
        provide: TranslateLoader,
        useClass: EmbeddedTranslateLoader,
      },
    }),
    MatIconModule,
    FeatureDatavizModule,
  ],
  providers: [
    {
      provide: Configuration,
      useValue: apiConfiguration,
    },
    {
      provide: OverlayContainer,
      useFactory: (document: Document, platform: Platform) => {
        const container = new AppOverlayContainer(document, platform)
        container.setSelector('gn-search-input')
        return container
      },
      deps: [DOCUMENT, Platform],
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
