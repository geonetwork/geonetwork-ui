import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DataApisComponent } from './data-apis/data-apis.component'
import { DataExportsComponent } from './data-exports/data-exports.component'
import { DataViewMapComponent } from './data-view-map/data-view-map.component'
import { DataViewTableComponent } from './data-view-table/data-view-table.component'
import { RecordMetadataComponent } from './record-metadata/record-metadata.component'
import { MdViewEffects } from './state/mdview.effects'
import { MdViewFacade } from './state/mdview.facade'
import { MD_VIEW_FEATURE_STATE_KEY, reducer } from './state/mdview.reducer'
import { RecordMetadataComponent } from './record-metadata/record-metadata.component'
import { DataViewMapComponent } from './data-view-map/data-view-map.component'
import { DataViewTableComponent } from './data-view-table/data-view-table.component'
import { DataExportsComponent } from './data-exports/data-exports.component'
import { DataApisComponent } from './data-apis/data-apis.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'

@NgModule({
  declarations: [
    RecordMetadataComponent,
    DataViewMapComponent,
    DataViewTableComponent,
    DataExportsComponent,
    DataApisComponent,
  ],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature(MD_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
    UiLayoutModule,
    FeatureMapModule,
    UiInputsModule,
    UiElementsModule,
  ],
  providers: [MdViewFacade],
  exports: [
    RecordMetadataComponent,
    DataViewMapComponent,
    DataViewTableComponent,
    DataExportsComponent,
    DataApisComponent,
  ],
})
export class MdViewModule {}
