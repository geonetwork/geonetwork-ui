import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component'

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class UiLayoutModule {}
