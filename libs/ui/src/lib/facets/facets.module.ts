import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FacetItemComponent } from './facet-item/facet-item.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [FacetItemComponent, ListComponent],
  imports: [CommonModule, FormsModule],
})
export class FacetsModule {}
