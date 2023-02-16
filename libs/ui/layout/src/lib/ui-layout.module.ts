import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FigureComponent } from './figure/figure.component'
import { TranslateModule } from '@ngx-translate/core'
import { ExpandablePanelComponent } from './expandable-panel/expandable-panel.component'
import { StickyHeaderComponent } from './sticky-header/sticky-header.component'
import { AnchorLinkDirective } from './anchor-link/anchor-link.directive'
import { ExpandablePanelButtonComponent } from './expandable-panel-button/expandable-panel-button.component'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  imports: [CommonModule, MatIconModule, TranslateModule.forChild()],
  declarations: [
    FigureComponent,
    ExpandablePanelComponent,
    StickyHeaderComponent,
    AnchorLinkDirective,
    ExpandablePanelButtonComponent,
  ],
  exports: [
    FigureComponent,
    ExpandablePanelComponent,
    StickyHeaderComponent,
    AnchorLinkDirective,
    ExpandablePanelButtonComponent,
  ],
})
export class UiLayoutModule {}
