import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FacetsContainerComponent } from './facets-container/facets-container.component'
import { FacetsModule as UiFacetsModule } from 'libs/ui/src/lib/facets/facets.module'

@NgModule({
  declarations: [FacetsContainerComponent],
  imports: [CommonModule, TranslateModule.forChild(), UiFacetsModule],
  exports: [FacetsContainerComponent],
})
export class FacetsModule {}
