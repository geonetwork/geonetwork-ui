import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FacetBlockComponent } from './facet-block/facet-block.component'
import { FacetItemComponent } from './facet-item/facet-item.component'

@NgModule({
  declarations: [FacetItemComponent, FacetBlockComponent],
  imports: [CommonModule, FormsModule],
})
export class FacetsModule {}
