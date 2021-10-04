import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MetadataInfoComponent } from './metadata-info/metadata-info.component'
import { ContentGhostComponent } from './content-ghost/content-ghost.component'

@NgModule({
  imports: [CommonModule],
  declarations: [MetadataInfoComponent, ContentGhostComponent],
  exports: [MetadataInfoComponent, ContentGhostComponent],
})
export class UiElementsModule {}
