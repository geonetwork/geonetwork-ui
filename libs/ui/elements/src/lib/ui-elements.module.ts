import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MetadataInfoComponent } from './metadata-info/metadata-info.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { DownloadsListItemComponent } from './downloads-list-item/downloads-list-item.component'
import { DownloadsListComponent } from './downloads-list/downloads-list.component'
import { ApisListItemComponent } from './apis-list-item/apis-list-item.component'
import { ApisListComponent } from './apis-list/apis-list.component'

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadsListItemComponent,
    DownloadsListComponent,
    ApisListItemComponent,
    ApisListComponent,
  ],
  exports: [
    MetadataInfoComponent,
    ContentGhostComponent,
    DownloadsListItemComponent,
    DownloadsListComponent,
    ApisListItemComponent,
    ApisListComponent,
  ],
})
export class UiElementsModule {}
