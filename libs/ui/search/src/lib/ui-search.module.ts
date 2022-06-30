import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { FacetsModule } from './facets/facets.module'
import { OrganisationPreviewComponent } from './organisation-preview/organisation-preview.component'
import { RecordMetricComponent } from './record-metric/record-metric.component'
import { RecordPreviewCardComponent } from './record-preview-card/record-preview-card.component'
import { RecordPreviewListComponent } from './record-preview-list/record-preview-list.component'
import { RecordPreviewTextComponent } from './record-preview-text/record-preview-text.component'
import { RecordPreviewTitleComponent } from './record-preview-title/record-preview-title.component'
import { ResultsHitsNumberComponent } from './results-hits-number/results-hits-number.component'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from './results-list/results-layout.config'
import { ResultsListComponent } from './results-list/results-list.component'
import { RecordPreviewComponent } from './record-preview/record-preview.component'
import { RecordThumbnailComponent } from './record-thumbnail/record-thumbnail.component'
import { TagInputModule } from 'ngx-chips'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ResultsListItemComponent } from './results-list-item/results-list-item.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { OrganisationsListComponent } from './organisations-list/organisations-list.component'

@NgModule({
  declarations: [
    RecordPreviewComponent,
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordPreviewTitleComponent,
    RecordMetricComponent,
    RecordThumbnailComponent,
    ResultsListComponent,
    ResultsHitsNumberComponent,
    ResultsListItemComponent,
    OrganisationPreviewComponent,
    OrganisationsListComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FacetsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    UtilSharedModule,
    UiWidgetsModule,
    MatIconModule,
  ],
  exports: [
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordPreviewTitleComponent,
    RecordMetricComponent,
    RecordThumbnailComponent,
    ResultsListComponent,
    FacetsModule,
    RecordPreviewComponent,
    ResultsHitsNumberComponent,
    OrganisationPreviewComponent,
    OrganisationsListComponent,
  ],
  providers: [
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DEFAULT_RESULTS_LAYOUT_CONFIG },
  ],
})
export class UiSearchModule {}
