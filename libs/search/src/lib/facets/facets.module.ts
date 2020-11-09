import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FacetsModule as UiFacetsModule } from '@lib/ui'
import { TranslateModule } from '@ngx-translate/core'
import { FacetsContainerComponent } from './facets-container/facets-container.component'

@NgModule({
  declarations: [FacetsContainerComponent],
  imports: [CommonModule, TranslateModule.forChild(), UiFacetsModule],
  exports: [FacetsContainerComponent],
})
export class FacetsModule {}
