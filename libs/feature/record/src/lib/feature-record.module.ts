import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FeatureDetailComponent,
  MapContainerComponent,
} from '@geonetwork-ui/ui/map'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import {
  FeatureMapModule,
  MapStateContainerComponent,
} from '@geonetwork-ui/feature/map'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { MdViewFacade } from './state'
import { MdViewEffects } from './state/mdview.effects'
import { MapViewComponent } from './map-view/map-view.component'
import { DataViewComponent } from './data-view/data-view.component'
import {
  METADATA_VIEW_FEATURE_STATE_KEY,
  reducer,
} from './state/mdview.reducer'
import { MatTabsModule } from '@angular/material/tabs'
import { PopupAlertComponent, UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { TranslateModule } from '@ngx-translate/core'
import { ExternalViewerButtonComponent } from './external-viewer-button/external-viewer-button.component'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { TableComponent } from '@geonetwork-ui/ui/dataviz'
import { FeatureDatavizModule } from '@geonetwork-ui/feature/dataviz'
import { DataViewPermalinkComponent } from './data-view-permalink/data-view-permalink.component'
import { DataViewWebComponentComponent } from './data-view-web-component/data-view-web-component.component'
import { DataViewShareComponent } from './data-view-share/data-view-share.component'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import { matClose, matOpenInNew } from '@ng-icons/material-icons/baseline'

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
    StoreModule.forFeature(METADATA_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
    UiLayoutModule,
    FeatureMapModule,
    FeatureCatalogModule,
    UiInputsModule,
    UiElementsModule,
    MatTabsModule,
    UiWidgetsModule,
    TranslateModule,
    TableComponent,
    FeatureDatavizModule,
    PopupAlertComponent,
    FeatureDetailComponent,
    MapStateContainerComponent,
    MapContainerComponent,
    NgIconsModule.withIcons({
      matClose,
      matOpenInNew,
    }),
  ],
  providers: [
    MdViewFacade,
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  exports: [
    MapViewComponent,
    DataViewComponent,
    DataViewPermalinkComponent,
    DataViewWebComponentComponent,
    DataViewShareComponent,
  ],
})
export class FeatureRecordModule {}
