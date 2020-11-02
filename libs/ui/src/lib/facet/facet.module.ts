import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component'

@NgModule({
  declarations: [CheckboxInputComponent],
  imports: [CommonModule, FormsModule],
})
export class FacetModule {}
