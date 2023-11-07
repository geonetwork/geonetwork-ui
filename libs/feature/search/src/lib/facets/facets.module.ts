import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiFacetsModule } from '@geonetwork-ui/ui/search'
import { TranslateModule } from '@ngx-translate/core'
import { FacetsContainerComponent } from './facets-container/facets-container.component'

@NgModule({
  declarations: [FacetsContainerComponent],
  imports: [CommonModule, TranslateModule.forChild(), UiFacetsModule],
  exports: [FacetsContainerComponent],
})
export class FacetsModule {}
