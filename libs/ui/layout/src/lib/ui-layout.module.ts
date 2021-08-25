import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component';
import { MetadataPageComponent } from './metadata-page/metadata-page.component'

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule],
  declarations: [TableComponent, MetadataPageComponent],
  exports: [TableComponent, MetadataPageComponent],
})
export class UiLayoutModule {}
