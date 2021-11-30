import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './table/table.component'
import { FigureComponent } from './figure/figure.component'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll'
import { CardLinkComponent } from './card-link/card-link.component'
import { TranslateModule } from '@ngx-translate/core'
import { ExpandablePanelComponent } from './expandable-panel/expandable-panel.component'

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    TableVirtualScrollModule,
    ScrollingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    TableComponent,
    FigureComponent,
    CardLinkComponent,
    ExpandablePanelComponent,
  ],
  exports: [
    TableComponent,
    FigureComponent,
    CardLinkComponent,
    ExpandablePanelComponent,
  ],
})
export class UiLayoutModule {}
