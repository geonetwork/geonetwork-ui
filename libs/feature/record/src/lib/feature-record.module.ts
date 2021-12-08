import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { MdViewFacade } from './state'
import { MdViewEffects } from './state/mdview.effects'
import { DataViewMapComponent } from './data-view-map/data-view-map.component'
import { DataViewTableComponent } from './data-view-table/data-view-table.component'
import { MD_VIEW_FEATURE_STATE_KEY, reducer } from './state/mdview.reducer'
import { DataApisComponent } from './data-apis/data-apis.component'
import { DataDownloadsComponent } from './data-downloads/data-downloads.component'
import { RecordMetadataComponent } from './record-metadata/record-metadata.component'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { TranslateModule } from '@ngx-translate/core'
import { DataOtherlinksComponent } from './data-otherlinks/data-otherlinks.component'
import { RelatedRecordsComponent } from './related-records/related-records.component'

@NgModule({
  declarations: [
    RecordMetadataComponent,
    DataViewMapComponent,
    DataViewTableComponent,
    DataDownloadsComponent,
    DataApisComponent,
    DataOtherlinksComponent,
    RelatedRecordsComponent,
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
    MatTabsModule,
    MatIconModule,
    UiWidgetsModule,
    TranslateModule,
  ],
  providers: [MdViewFacade],
  exports: [
    RecordMetadataComponent,
    DataViewMapComponent,
    DataViewTableComponent,
    DataDownloadsComponent,
    DataApisComponent,
    DataOtherlinksComponent,
  ],
})
export class FeatureRecordModule {}
