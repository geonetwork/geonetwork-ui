import { NgModule } from '@angular/core'
import { SafePipe } from './pipes/SafePipe'
import { CommonModule } from '@angular/common'
import { ImageDirective } from './image.directive'

@NgModule({
  declarations: [SafePipe, ImageDirective],
  imports: [CommonModule],
  exports: [SafePipe, ImageDirective],
})
export class UtilSharedModule {}
