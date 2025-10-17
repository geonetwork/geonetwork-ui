import { OverlayContainer } from '@angular/cdk/overlay'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
  importProvidersFrom,
  Injector,
  NgModule,
} from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  ChartViewComponent,
  TableViewComponent,
} from '@geonetwork-ui/feature/dataviz'
import {
  FeatureMapModule,
  LayersPanelComponent,
  MapStateContainerComponent,
} from '@geonetwork-ui/feature/map'
import {
  FeatureRecordModule,
  MapViewComponent,
} from '@geonetwork-ui/feature/record'
import {
  FacetsContainerComponent,
  FeatureSearchModule,
  FuzzySearchComponent,
  RecordsMetricsComponent,
  ResultsListContainerComponent,
} from '@geonetwork-ui/feature/search'
import { FigureComponent } from '@geonetwork-ui/ui/dataviz'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { GEONETWORK_UI_VERSION, PROXY_PATH } from '@geonetwork-ui/util/shared'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppComponent } from './app.component'
import { BaseComponent } from './components/base.component'
import { GnAggregatedRecordsComponent } from './components/gn-aggregated-records/gn-aggregated-records.component'
import { GnDatasetViewChartComponent } from './components/gn-dataset-view-chart/gn-dataset-view-chart.component'
import { GnDatasetViewMapComponent } from './components/gn-dataset-view-map/gn-dataset-view-map.component'
import { GnDatasetViewTableComponent } from './components/gn-dataset-view-table/gn-dataset-view-table.component'
import { GnFacetsComponent } from './components/gn-facets/gn-facets.component'
import { GnFigureDatasetsComponent } from './components/gn-figure-datasets/gn-figure-datasets.component'
import { GnMapViewerComponent } from './components/gn-map-viewer/gn-map-viewer.component'
import { GnResultsListComponent } from './components/gn-results-list/gn-results-list.component'
import { GnSearchInputComponent } from './components/gn-search-input/gn-search-input.component'
import { standaloneConfigurationObject } from './configuration'
import { StandaloneSearchModule } from './standalone-search.module'
import { WebcomponentOverlayContainer } from './webcomponent-overlay-container'

const CUSTOM_ELEMENTS: [new (...args) => BaseComponent, string][] = [
  [GnFacetsComponent, 'gn-facets'],
  [GnResultsListComponent, 'gn-results-list'],
  [GnAggregatedRecordsComponent, 'gn-aggregated-records'],
  [GnSearchInputComponent, 'gn-search-input'],
  [GnDatasetViewTableComponent, 'gn-dataset-view-table'],
  [GnDatasetViewChartComponent, 'gn-dataset-view-chart'],
  [GnMapViewerComponent, 'gn-map-viewer'],
  [GnFigureDatasetsComponent, 'gn-figure-datasets'],
  [GnDatasetViewMapComponent, 'gn-dataset-view-map'],
]

@NgModule({
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
    GnFigureDatasetsComponent,
    GnDatasetViewMapComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FeatureSearchModule,
    FeatureRecordModule,
    FeatureMapModule,
    MapStateContainerComponent,
    LayersPanelComponent,
    TableViewComponent,
    ChartViewComponent,
    MapViewComponent,
    ButtonComponent,
    FigureComponent,
    FuzzySearchComponent,
    RecordsMetricsComponent,
    ResultsListContainerComponent,
    FacetsContainerComponent,
    LayersPanelComponent,
    FigureComponent,
  ],
  providers: [
    importProvidersFrom(
      StandaloneSearchModule,
      StoreModule.forRoot({}),
      StoreDevtoolsModule.instrument({ connectInZone: true }),
      EffectsModule.forRoot()
    ),
    {
      provide: OverlayContainer,
      useClass: WebcomponentOverlayContainer,
    },
    {
      provide: PROXY_PATH,
      useFactory: standaloneConfigurationObject.proxyPathFactory,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // bootstrap: [AppComponent],
})
export class WebcomponentsModule implements DoBootstrap {
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

  ngDoBootstrap() {
    console.log(
      `[geonetwork-ui] GeoNetwork-UI Web Components v${GEONETWORK_UI_VERSION} loaded`
    )
  }
}
