import { NgModule } from '@angular/core'
import { SafePipe } from './pipes/SafePipe'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule],
  exports: [SafePipe],
})
export class UtilSharedModule {}
