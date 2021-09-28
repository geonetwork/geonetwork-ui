import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { MdViewEffects } from './state/mdview.effects'
import { MdViewFacade } from './state/mdview.facade'
import { MD_VIEW_FEATURE_STATE_KEY, reducer } from './state/mdview.reducer'
import { RecordMetadataComponent } from './record-metadata/record-metadata.component'
import { DataViewMapComponent } from './data-view-map/data-view-map.component'
import { DataViewTableComponent } from './data-view-table/data-view-table.component'
import { RecordExportsComponent } from './record-exports/record-exports.component'
import { RecordApisComponent } from './record-apis/record-apis.component'

@NgModule({
  declarations: [
    RecordMetadataComponent,
    DataViewMapComponent,
    DataViewTableComponent,
    RecordExportsComponent,
    RecordApisComponent,
  ],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature(MD_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
  ],
  providers: [MdViewFacade],
  exports: [
    RecordMetadataComponent,
    DataViewMapComponent,
    DataViewTableComponent,
    RecordExportsComponent,
    RecordApisComponent,
  ],
})
export class MdViewModule {}
