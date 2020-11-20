import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { FacetBlockComponent } from './facet-block/facet-block.component'
import { FacetItemComponent } from './facet-item/facet-item.component'

@NgModule({
  declarations: [FacetItemComponent, FacetBlockComponent],
  imports: [CommonModule, FormsModule, TranslateModule.forChild()],
})
export class FacetsModule {}
