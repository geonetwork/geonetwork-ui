import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { MetadataInfoComponent } from './metadata-info/metadata-info.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { DownloadItemComponent } from './download-item/download-item.component'
import { DownloadsListComponent } from './downloads-list/downloads-list.component'
import { ApiCardComponent } from './api-card/api-card.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { LinkCardComponent } from './link-card/link-card.component'
import { RelatedRecordCardComponent } from './related-record-card/related-record-card.component'
import { MetadataContactComponent } from './metadata-contact/metadata-contact.component'
import { MetadataCatalogComponent } from './metadata-catalog/metadata-catalog.component'
import { SearchResultsErrorComponent } from './search-results-error/search-results-error.component'
import { PaginationComponent } from './pagination/pagination.component'
import { ThumbnailComponent } from './thumbnail/thumbnail.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { FormsModule } from '@angular/forms'
import { AvatarComponent } from './avatar/avatar.component'
import { UserPreviewComponent } from './user-preview/user-preview.component'
import { GnUiLinkifyDirective } from './metadata-info/linkify.directive'
import { PaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    UiWidgetsModule,
    UiLayoutModule,
    TranslateModule.forChild(),
    UtilSharedModule,
    RouterModule,
    UiInputsModule,
    FormsModule,
    NgOptimizedImage,
  ],
  declarations: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadItemComponent,
    DownloadsListComponent,
    ApiCardComponent,
    LinkCardComponent,
    RelatedRecordCardComponent,
    MetadataContactComponent,
    MetadataCatalogComponent,
    SearchResultsErrorComponent,
    PaginationComponent,
    ThumbnailComponent,
    AvatarComponent,
    UserPreviewComponent,
    GnUiLinkifyDirective,
    PaginationButtonsComponent,
  ],
  exports: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadItemComponent,
    DownloadsListComponent,
    ApiCardComponent,
    LinkCardComponent,
    RelatedRecordCardComponent,
    MetadataContactComponent,
    MetadataCatalogComponent,
    SearchResultsErrorComponent,
    PaginationComponent,
    ThumbnailComponent,
    AvatarComponent,
    UserPreviewComponent,
    PaginationButtonsComponent,
  ],
})
export class UiElementsModule {}
