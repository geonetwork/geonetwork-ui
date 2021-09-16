import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component'
import { MetadataPageComponent } from './metadata-page/metadata-page.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { FigureComponent } from './figure/figure.component'
import { DownloadEntryComponent } from './download-entry/download-entry.component'

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule],
  declarations: [
    TableComponent,
    MetadataPageComponent,
    ContentGhostComponent,
    FigureComponent,
    DownloadEntryComponent,
  ],
  exports: [
    TableComponent,
    MetadataPageComponent,
    ContentGhostComponent,
    FigureComponent,
    DownloadEntryComponent,
  ],
})
export class UiLayoutModule {}
