import { InjectionToken, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { MdViewFacade } from './state'
import { MdViewEffects } from './state/mdview.effects'
import { MapViewComponent } from './map-view/map-view.component'
import { DataViewComponent } from './data-view/data-view.component'
import { MD_VIEW_FEATURE_STATE_KEY, reducer } from './state/mdview.reducer'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { TranslateModule } from '@ngx-translate/core'
import { ExternalViewerButtonComponent } from './external-viewer-button/external-viewer-button.component'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { TableComponent } from '@geonetwork-ui/ui/dataviz'
import { FeatureDatavizModule } from '@geonetwork-ui/feature/dataviz'
import { DataViewPermalinkComponent } from './data-view-permalink/data-view-permalink.component'
import { DataViewWebComponentComponent } from './data-view-web-component/data-view-web-component.component'
import { DataViewShareComponent } from './data-view-share/data-view-share.component'

export const GN_UI_VERSION = new InjectionToken<string>('gnUiVersion')
@NgModule({
  declarations: [
    MapViewComponent,
    DataViewComponent,
    ExternalViewerButtonComponent,
    DataViewPermalinkComponent,
    DataViewWebComponentComponent,
    DataViewShareComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(MD_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
    UiLayoutModule,
    FeatureMapModule,
    FeatureCatalogModule,
    UiMapModule,
    UiInputsModule,
    UiElementsModule,
    MatTabsModule,
    MatIconModule,
    UiWidgetsModule,
    TranslateModule,
    TableComponent,
    FeatureDatavizModule,
  ],
  providers: [MdViewFacade],
  exports: [
    MapViewComponent,
    DataViewComponent,
    DataViewPermalinkComponent,
    DataViewWebComponentComponent,
    DataViewShareComponent,
  ],
})
export class FeatureRecordModule {}
