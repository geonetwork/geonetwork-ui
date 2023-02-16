import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll'
import { TableComponent } from './table/table.component'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { FigureComponent } from './figure/figure.component'
import { MatIconModule } from '@angular/material/icon'
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    TableVirtualScrollModule,
    ScrollingModule,
    MatIconModule,
  ],
  declarations: [TableComponent, FigureComponent],
  exports: [TableComponent, FigureComponent],
})
export class UiDatavizModule {}
