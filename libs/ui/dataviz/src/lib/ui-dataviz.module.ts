import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FigureComponent } from './figure/figure.component'
import { TranslateModule } from '@ngx-translate/core'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import { matCorporateFare } from '@ng-icons/material-icons/baseline'
import { tablerFolderOpen } from '@ng-icons/tabler-icons'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    // FIXME: these imports are required by non-standalone components and should be removed once all components have been made standalone
    NgIconsModule.withIcons({
      matCorporateFare,
      tablerFolderOpen,
    }),
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  declarations: [FigureComponent],
  exports: [FigureComponent],
})
export class UiDatavizModule {}
