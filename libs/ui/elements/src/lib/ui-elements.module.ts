import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MetadataPageComponent } from './metadata-page/metadata-page.component'

@NgModule({
  imports: [CommonModule],
  declarations: [MetadataPageComponent],
  exports: [MetadataPageComponent],
})
export class UiElementsModule {}
