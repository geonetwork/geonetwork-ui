import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { ExpandablePanelComponent } from './expandable-panel/expandable-panel.component'
import { StickyHeaderComponent } from './sticky-header/sticky-header.component'
import { AnchorLinkDirective } from './anchor-link/anchor-link.directive'
import { ExpandablePanelButtonComponent } from './expandable-panel-button/expandable-panel-button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matExpandMore,
  matExpandLess,
  matAdd,
  matRemove,
} from '@ng-icons/material-icons/baseline'

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), NgIconComponent],
  providers: [
    provideIcons({ matExpandMore, matExpandLess, matRemove, matAdd }),
    provideNgIconsConfig({
      size: '0.9em',
    }),
  ],
  declarations: [
    ExpandablePanelComponent,
    StickyHeaderComponent,
    AnchorLinkDirective,
    ExpandablePanelButtonComponent,
  ],
  exports: [
    ExpandablePanelComponent,
    StickyHeaderComponent,
    AnchorLinkDirective,
    ExpandablePanelButtonComponent,
  ],
})
export class UiLayoutModule {}
