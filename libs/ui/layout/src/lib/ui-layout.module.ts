import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { ExpandablePanelComponent } from './expandable-panel/expandable-panel.component'
import { StickyHeaderComponent } from './sticky-header/sticky-header.component'
import { AnchorLinkDirective } from './anchor-link/anchor-link.directive'
import { ExpandablePanelButtonComponent } from './expandable-panel-button/expandable-panel-button.component'
import { MatIconModule } from '@angular/material/icon'
import { CarouselComponent } from './carousel/carousel.component'

@NgModule({
  imports: [CommonModule, MatIconModule, TranslateModule.forChild()],
  declarations: [
    ExpandablePanelComponent,
    StickyHeaderComponent,
    AnchorLinkDirective,
    ExpandablePanelButtonComponent,
    CarouselComponent,
  ],
  exports: [
    ExpandablePanelComponent,
    StickyHeaderComponent,
    AnchorLinkDirective,
    ExpandablePanelButtonComponent,
    CarouselComponent,
  ],
})
export class UiLayoutModule {}
