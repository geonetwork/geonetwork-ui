import { NgModule } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { FacetsModule } from './facets/facets.module'
import { RecordMetricComponent } from './record-metric/record-metric.component'
import { RecordPreviewCardComponent } from './record-preview-card/record-preview-card.component'
import { RecordPreviewListComponent } from './record-preview-list/record-preview-list.component'
import { RecordPreviewRowComponent } from './record-preview-row/record-preview-row.component'
import { RecordPreviewTextComponent } from './record-preview-text/record-preview-text.component'
import { RecordPreviewTitleComponent } from './record-preview-title/record-preview-title.component'
import { ResultsHitsNumberComponent } from './results-hits-number/results-hits-number.component'
import { ResultsHitsSearchKindComponent } from './results-hits-search-kind/results-hits-search-kind.component'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from './results-list/results-layout.config'
import { ResultsListComponent } from './results-list/results-list.component'
import { RecordPreviewComponent } from './record-preview/record-preview.component'
import { TagInputModule } from 'ngx-chips'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ResultsListItemComponent } from './results-list-item/results-list-item.component'
import {
  InternalLinkCardComponent,
  KindBadgeComponent,
  MarkdownParserComponent,
  MetadataQualityComponent,
  ThumbnailComponent,
} from '@geonetwork-ui/ui/elements'
import { RecordPreviewFeedComponent } from './record-preview-feed/record-preview-feed.component'
import { CommonModule } from '@angular/common'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { InteractiveTableComponent } from '@geonetwork-ui/ui/layout'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import {
  matCloudDownloadOutline,
  matHomeWorkOutline,
  matMapOutline,
} from '@ng-icons/material-icons/outline'
import { matFace } from '@ng-icons/material-icons/baseline'
import { InlineFilterComponent } from '@geonetwork-ui/ui/inputs'
import { ActionMenuComponent } from './results-table/action-menu/action-menu.component'

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
    ResultsHitsSearchKindComponent,
    ResultsListItemComponent,
    RecordPreviewFeedComponent,
    RecordPreviewRowComponent,
  ],
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    NgxDropzoneModule,
    FacetsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    MatCheckboxModule,
    RouterLink,
    InteractiveTableComponent,
    // FIXME: these imports are required by non-standalone components and should be removed once all components have been made standalone
    NgIconsModule.withIcons({
      matMapOutline,
      matCloudDownloadOutline,
      matFace,
      matHomeWorkOutline,
    }),
    KindBadgeComponent,
    MetadataQualityComponent,
    InlineFilterComponent,
    ThumbnailComponent,
    MarkdownParserComponent,
    InternalLinkCardComponent,
    ActionMenuComponent,
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
    ResultsHitsSearchKindComponent,
    RecordPreviewFeedComponent,
    RecordPreviewRowComponent,
    ActionMenuComponent,
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DEFAULT_RESULTS_LAYOUT_CONFIG },
  ],
})
export class UiSearchModule {}
