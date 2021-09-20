import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component'
import { FigureComponent } from './figure/figure.component'
import { ExportEntryComponent } from './export-entry/export-entry.component'
import { ExportListComponent } from './export-list/export-list.component'

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule],
  declarations: [
    TableComponent,
    MetadataPageComponent,
    ContentGhostComponent,
    FigureComponent,
    ExportEntryComponent,
    ExportListComponent,
  ],
  exports: [
    TableComponent,
    MetadataPageComponent,
    ContentGhostComponent,
    FigureComponent,
    ExportEntryComponent,
    ExportListComponent,
  ],
})
export class UiLayoutModule {}
