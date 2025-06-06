import { OverlayContainer } from '@angular/cdk/overlay'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
  importProvidersFrom,
  Injector,
  NgModule,
} from '@angular/core'
import { createCustomElement } from '@angular/elements'
import {
  FeatureRecordModule,
  MapViewComponent,
} from '@geonetwork-ui/feature/record'
import {
  FeatureSearchModule,
  FuzzySearchComponent,
} from '@geonetwork-ui/feature/search'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppComponent } from './app.component'
import { WebcomponentOverlayContainer } from './webcomponent-overlay-container'
import { BaseComponent } from './components/base.component'
import { GnAggregatedRecordsComponent } from './components/gn-aggregated-records/gn-aggregated-records.component'
import { GnFacetsComponent } from './components/gn-facets/gn-facets.component'
import { GnResultsListComponent } from './components/gn-results-list/gn-results-list.component'
import { GnSearchInputComponent } from './components/gn-search-input/gn-search-input.component'
import { GnDatasetViewTableComponent } from './components/gn-dataset-view-table/gn-dataset-view-table.component'
import { GnMapViewerComponent } from './components/gn-map-viewer/gn-map-viewer.component'
import {
  FeatureMapModule,
  LayersPanelComponent,
  MapStateContainerComponent,
} from '@geonetwork-ui/feature/map'
import { GnDatasetViewChartComponent } from './components/gn-dataset-view-chart/gn-dataset-view-chart.component'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { GnFigureDatasetsComponent } from './components/gn-figure-datasets/gn-figure-datasets.component'
import { GnDatasetViewMapComponent } from './components/gn-dataset-view-map/gn-dataset-view-map.component'
import {
  ChartViewComponent,
  TableViewComponent,
} from '@geonetwork-ui/feature/dataviz'
import { StandaloneSearchModule } from './standalone-search.module'
import { GEONETWORK_UI_VERSION } from '@geonetwork-ui/util/shared'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { FigureComponent } from '@geonetwork-ui/ui/dataviz'

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
    UiSearchModule,
    FeatureSearchModule,
    FeatureRecordModule,
    FeatureMapModule,
    FeatureAuthModule,
    MapStateContainerComponent,
    LayersPanelComponent,
    TableViewComponent,
    ChartViewComponent,
    MapViewComponent,
    ButtonComponent,
    FigureComponent,
    FuzzySearchComponent,
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
