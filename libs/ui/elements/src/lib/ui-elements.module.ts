import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { MetadataInfoComponent } from './metadata-info/metadata-info.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { DownloadItemComponent } from './download-item/download-item.component'
import { DownloadsListComponent } from './downloads-list/downloads-list.component'
import { ApiCardComponent } from './api-card/api-card.component'
import { PopoverComponent, UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { MaxLinesComponent, UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { RelatedRecordCardComponent } from './related-record-card/related-record-card.component'
import { MetadataContactComponent } from './metadata-contact/metadata-contact.component'
import { MetadataCatalogComponent } from './metadata-catalog/metadata-catalog.component'
import { MetadataQualityComponent } from './metadata-quality/metadata-quality.component'
import { MetadataQualityItemComponent } from './metadata-quality-item/metadata-quality-item.component'
import { ErrorComponent } from './error/error.component'
import { PaginationComponent } from './pagination/pagination.component'
import { ThumbnailComponent } from './thumbnail/thumbnail.component'
import {
  BadgeComponent,
  TextInputComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { FormsModule } from '@angular/forms'
import { AvatarComponent } from './avatar/avatar.component'
import { UserPreviewComponent } from './user-preview/user-preview.component'
import { GnUiLinkifyDirective } from './metadata-info/linkify.directive'
import { PaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component'
import { RecordApiFormComponent } from './record-api-form/record-api-form.component'
import { MarkdownParserComponent } from './markdown-parser/markdown-parser.component'
import { ImageOverlayPreviewComponent } from './image-overlay-preview/image-overlay-preview.component'
import { UserFeedbackItemComponent } from './user-feedback-item/user-feedback-item.component'
import { TimeSincePipe } from './user-feedback-item/time-since.pipe'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import {
  matMailOutline,
  matMoreHoriz,
  matOpenInNew,
  matPersonOutline,
  matFace,
  matQuestionMark,
  matMoodBad,
  matZoomOutMap,
  matCheck,
  matWarningAmber,
  matChevronLeft,
  matChevronRight,
} from '@ng-icons/material-icons/baseline'
import {
  matCallOutline,
  matLocationOnOutline,
  matCloudDownloadOutline,
  matComputerOutline,
} from '@ng-icons/material-icons/outline'
import { iconoirNavArrowRight, iconoirNavArrowLeft } from '@ng-icons/iconoir'

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    UiWidgetsModule,
    UiLayoutModule,
    TranslateModule.forChild(),
    UtilSharedModule,
    RouterModule,
    UiInputsModule,
    FormsModule,
    NgOptimizedImage,
    PopoverComponent,
    MarkdownParserComponent,
    ThumbnailComponent,
    TimeSincePipe,
    BadgeComponent,
    MaxLinesComponent,
    TextInputComponent,
    NgIconsModule.withIcons({
      matMoreHoriz,
      matOpenInNew,
      matMailOutline,
      matCallOutline,
      matPersonOutline,
      matLocationOnOutline,
      matCloudDownloadOutline,
      matComputerOutline,
      matFace,
      matQuestionMark,
      matMoodBad,
      matZoomOutMap,
      matCheck,
      matWarningAmber,
      iconoirNavArrowRight,
      iconoirNavArrowLeft,
      matChevronLeft,
      matChevronRight,
    }),
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  declarations: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadItemComponent,
    DownloadsListComponent,
    ApiCardComponent,
    RelatedRecordCardComponent,
    MetadataContactComponent,
    MetadataCatalogComponent,
    MetadataQualityComponent,
    MetadataQualityItemComponent,
    ErrorComponent,
    PaginationComponent,
    AvatarComponent,
    UserPreviewComponent,
    GnUiLinkifyDirective,
    PaginationButtonsComponent,
    RecordApiFormComponent,
    UserFeedbackItemComponent,
    ImageOverlayPreviewComponent,
  ],
  exports: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadItemComponent,
    DownloadsListComponent,
    ApiCardComponent,
    RelatedRecordCardComponent,
    MetadataContactComponent,
    MetadataCatalogComponent,
    MetadataQualityComponent,
    MetadataQualityItemComponent,
    ErrorComponent,
    PaginationComponent,
    ThumbnailComponent,
    AvatarComponent,
    UserPreviewComponent,
    PaginationButtonsComponent,
    RecordApiFormComponent,
    MarkdownParserComponent,
    UserFeedbackItemComponent,
    ImageOverlayPreviewComponent,
  ],
})
export class UiElementsModule {}
