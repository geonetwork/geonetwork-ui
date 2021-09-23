import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'
import { FigureComponent } from './figure/figure.component'

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule],
  declarations: [TableComponent, ContentGhostComponent, FigureComponent],
  exports: [TableComponent, ContentGhostComponent, FigureComponent],
})
export class UiLayoutModule {}
