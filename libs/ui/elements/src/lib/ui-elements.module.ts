import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MetadataInfoComponent } from './metadata-info/metadata-info.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { ExportEntryComponent } from './export-entry/export-entry.component'
import { ExportListComponent } from './export-list/export-list.component'

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [
    MetadataInfoComponent,
    ContentGhostComponent,
    ExportEntryComponent,
    ExportListComponent,
  ],
  exports: [
    MetadataInfoComponent,
    ContentGhostComponent,
    ExportEntryComponent,
    ExportListComponent,
  ],
})
export class UiElementsModule {}
