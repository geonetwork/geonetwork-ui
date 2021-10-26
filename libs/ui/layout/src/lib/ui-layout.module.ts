import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component'
import { FigureComponent } from './figure/figure.component'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll'

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    TableVirtualScrollModule,
    ScrollingModule,
  ],
  declarations: [TableComponent, FigureComponent],
  exports: [TableComponent, FigureComponent],
})
export class UiLayoutModule {}
