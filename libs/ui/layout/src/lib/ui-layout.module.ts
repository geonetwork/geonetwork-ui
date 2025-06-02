import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIconComponent } from '@ng-icons/core'
import { StickyHeaderComponent } from './sticky-header/sticky-header.component'
import { AnchorLinkDirective } from './anchor-link/anchor-link.directive'

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), NgIconComponent],
  providers: [],
  declarations: [StickyHeaderComponent, AnchorLinkDirective],
  exports: [StickyHeaderComponent, AnchorLinkDirective],
})
export class UiLayoutModule {}
