import { CommonModule } from '@angular/common'
import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { I18nModule, TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { Configuration } from '@lib/gn-api'
import { LibSearchModule, SearchFacade } from '@lib/search'
import { UiModule } from '@lib/ui'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { apiConfiguration, BaseComponent } from './components/base.component'
import { GnAggregatedRecordsComponent } from './components/gn-aggregated-records/gn-aggregated-records.component'
import { GnFacetsComponent } from './components/gn-facets/gn-facets.component'
import { GnResultsListComponent } from './components/gn-results-list/gn-results-list.component'

const CUSTOM_ELEMENTS: any[] = [
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
    UiModule,
    LibSearchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    I18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
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
export class GnWcModule {
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
