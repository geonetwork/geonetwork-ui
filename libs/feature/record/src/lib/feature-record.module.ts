import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { MdViewFacade } from './state'
import { MdViewEffects } from './state/mdview.effects'
import {
  METADATA_VIEW_FEATURE_STATE_KEY,
  reducer,
} from './state/mdview.reducer'
import { MatTabsModule } from '@angular/material/tabs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { DataTableComponent } from '@geonetwork-ui/ui/dataviz'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(METADATA_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
    FeatureMapModule,
    FeatureCatalogModule,
    MatTabsModule,
    TranslateDirective,
    TranslatePipe,
    DataTableComponent,
    NgIconsModule,
    DropdownSelectorComponent,
  ],
  providers: [
    MdViewFacade,
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class FeatureRecordModule {}
