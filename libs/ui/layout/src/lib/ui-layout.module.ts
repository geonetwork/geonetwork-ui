import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component';
import { MetadataPageComponent } from './metadata-page/metadata-page.component';
import { ContentGhostComponent } from './content-ghost/content-ghost.component'

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule],
  declarations: [TableComponent, MetadataPageComponent, ContentGhostComponent],
  exports: [TableComponent, MetadataPageComponent, ContentGhostComponent],
})
export class UiLayoutModule {}
