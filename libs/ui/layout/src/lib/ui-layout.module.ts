import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { StickyHeaderComponent } from './sticky-header/sticky-header.component'
import { AnchorLinkDirective } from './anchor-link/anchor-link.directive'
import { NgIconComponent, provideNgIconsConfig } from '@ng-icons/core'

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), NgIconComponent],
  providers: [],
  declarations: [StickyHeaderComponent, AnchorLinkDirective],
  exports: [StickyHeaderComponent, AnchorLinkDirective],
})
export class UiLayoutModule {}
