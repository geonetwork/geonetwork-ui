import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MetadataPageComponent } from './metadata-page/metadata-page.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'

@NgModule({
  imports: [CommonModule],
  declarations: [MetadataPageComponent, ContentGhostComponent],
  exports: [MetadataPageComponent, ContentGhostComponent],
})
export class UiElementsModule {}
