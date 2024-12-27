import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { MdViewFacade } from './state'
import { MdViewEffects } from './state/mdview.effects'
import {
  METADATA_VIEW_FEATURE_STATE_KEY,
  reducer,
} from './state/mdview.reducer'
import { IgnApiDlComponent } from './ign-api-dl/ign-api-dl.component'
import { IgnApiProduitComponent } from './ign-api-produit/ign-api-produit.component'
import { MatTabsModule } from '@angular/material/tabs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { TranslateModule } from '@ngx-translate/core'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { TableComponent } from '@geonetwork-ui/ui/dataviz'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'

@NgModule({
  declarations: [IgnApiDlComponent, IgnApiProduitComponent],
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
    NgIconsModule,
    DropdownSelectorComponent,
  ],
  providers: [
    MdViewFacade,
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  exports: [IgnApiDlComponent],
})
export class FeatureRecordModule {}
