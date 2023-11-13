import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FigureComponent } from './figure/figure.component'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [CommonModule, MatIconModule, TranslateModule.forChild()],
  declarations: [FigureComponent],
  exports: [FigureComponent],
})
export class UiDatavizModule {}
