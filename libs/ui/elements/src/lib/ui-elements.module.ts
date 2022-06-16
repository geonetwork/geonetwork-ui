import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { MetadataInfoComponent } from './metadata-info/metadata-info.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { DownloadItemComponent } from './download-item/download-item.component'
import { ApiCardComponent } from './api-card/api-card.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { LinkCardComponent } from './link-card/link-card.component'
import { RelatedRecordCardComponent } from './related-record-card/related-record-card.component'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { MetadataContactComponent } from './metadata-contact/metadata-contact.component'
import { MetadataCatalogComponent } from './metadata-catalog/metadata-catalog.component'
import { SearchResultsErrorComponent } from './search-results-error/search-results-error.component'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    UiWidgetsModule,
    UiLayoutModule,
    TranslateModule.forChild(),
    UtilSharedModule,
    UiSearchModule,
    RouterModule,
  ],
  declarations: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadItemComponent,
    ApiCardComponent,
    LinkCardComponent,
    RelatedRecordCardComponent,
    MetadataContactComponent,
    MetadataCatalogComponent,
    SearchResultsErrorComponent,
  ],
  exports: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadItemComponent,
    ApiCardComponent,
    LinkCardComponent,
    RelatedRecordCardComponent,
    MetadataContactComponent,
    MetadataCatalogComponent,
    SearchResultsErrorComponent,
  ],
})
export class UiElementsModule {}
