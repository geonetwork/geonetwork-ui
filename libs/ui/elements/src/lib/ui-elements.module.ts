import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { MetadataInfoComponent } from './metadata-info/metadata-info.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { DownloadsListItemComponent } from './downloads-list-item/downloads-list-item.component'
import { DownloadsListComponent } from './downloads-list/downloads-list.component'
import { ApiCardComponent } from './api-card/api-card.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { LinkCardComponent } from './link-card/link-card.component'
import { RelatedRecordCardComponent } from './related-record-card/related-record-card.component'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    UiWidgetsModule,
    UiLayoutModule,
    TranslateModule.forChild(),
    UtilSharedModule,
  ],
  declarations: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadsListItemComponent,
    DownloadsListComponent,
    ApiCardComponent,
    LinkCardComponent,
    RelatedRecordCardComponent,
  ],
  exports: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadsListItemComponent,
    DownloadsListComponent,
    ApiCardComponent,
    LinkCardComponent,
    RelatedRecordCardComponent,
  ],
})
export class UiElementsModule {}
