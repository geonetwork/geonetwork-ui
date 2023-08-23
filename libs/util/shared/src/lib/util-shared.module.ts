import { NgModule } from '@angular/core'
import { SafePipe } from './pipes/SafePipe'
import { CommonModule } from '@angular/common'
import { ImageFallbackDirective } from './image-fallback.directive'

@NgModule({
  declarations: [SafePipe, ImageFallbackDirective],
  imports: [CommonModule],
  exports: [SafePipe, ImageFallbackDirective],
})
export class UtilSharedModule {}
