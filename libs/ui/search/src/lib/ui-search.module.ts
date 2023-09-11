import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { FacetsModule } from './facets/facets.module'
import { RecordMetricComponent } from './record-metric/record-metric.component'
import { RecordPreviewCardComponent } from './record-preview-card/record-preview-card.component'
import { RecordPreviewListComponent } from './record-preview-list/record-preview-list.component'
import { RecordPreviewRowComponent } from './record-preview-row/record-preview-row.component'
import { RecordPreviewTextComponent } from './record-preview-text/record-preview-text.component'
import { RecordPreviewTitleComponent } from './record-preview-title/record-preview-title.component'
import { ResultsHitsNumberComponent } from './results-hits-number/results-hits-number.component'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from './results-list/results-layout.config'
import { ResultsListComponent } from './results-list/results-list.component'
import { RecordPreviewComponent } from './record-preview/record-preview.component'
import { TagInputModule } from 'ngx-chips'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ResultsListItemComponent } from './results-list-item/results-list-item.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { RecordPreviewFeedComponent } from './record-preview-feed/record-preview-feed.component'
import { RecordTableComponent } from './record-table/record-table.component'
import { CommonModule } from '@angular/common'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

@NgModule({
  declarations: [
    RecordPreviewComponent,
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordPreviewTitleComponent,
    RecordMetricComponent,
    ResultsListComponent,
    ResultsHitsNumberComponent,
    ResultsListItemComponent,
    RecordPreviewFeedComponent,
    RecordPreviewRowComponent,
    RecordTableComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FacetsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    UtilSharedModule,
    UiWidgetsModule,
    UiInputsModule,
    UiElementsModule,
    MatIconModule,
    RouterLink,
  ],
  exports: [
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordPreviewTitleComponent,
    RecordMetricComponent,
    ResultsListComponent,
    FacetsModule,
    RecordPreviewComponent,
    ResultsHitsNumberComponent,
    RecordPreviewFeedComponent,
    RecordPreviewRowComponent,
    RecordTableComponent,
  ],
  providers: [
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DEFAULT_RESULTS_LAYOUT_CONFIG },
  ],
})
export class UiSearchModule {}
