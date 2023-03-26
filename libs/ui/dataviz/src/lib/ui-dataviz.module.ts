import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FigureComponent } from './figure/figure.component'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [FigureComponent],
  exports: [FigureComponent],
})
export class UiDatavizModule {}
