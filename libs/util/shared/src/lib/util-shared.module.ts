import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ImageFallbackDirective } from './image-fallback.directive'

@NgModule({
  declarations: [ImageFallbackDirective],
  imports: [CommonModule],
  exports: [ImageFallbackDirective],
})
export class UtilSharedModule {}
