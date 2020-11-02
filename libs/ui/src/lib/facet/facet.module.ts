import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [CheckboxInputComponent, ListComponent],
  imports: [CommonModule, FormsModule],
})
export class FacetModule {}
