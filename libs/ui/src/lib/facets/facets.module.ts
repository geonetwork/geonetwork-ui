import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { FacetBlockComponent } from './facet-block/facet-block.component'
import { FacetItemComponent } from './facet-item/facet-item.component'
import { FacetListComponent } from './facet-list/facet-list.component'

@NgModule({
  declarations: [FacetItemComponent, FacetBlockComponent, FacetListComponent],
  imports: [CommonModule, FormsModule, TranslateModule.forChild()],
  exports: [FacetListComponent],
})
export class FacetsModule {}
