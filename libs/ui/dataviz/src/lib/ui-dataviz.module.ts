import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll'
import { TableComponent } from './table/table.component'
import { ScrollingModule } from '@angular/cdk/scrolling'
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    TableVirtualScrollModule,
    ScrollingModule,
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class UiDatavizModule {}
