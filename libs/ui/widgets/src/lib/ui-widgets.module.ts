import { NgModule } from '@angular/core'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ColorScaleComponent } from './color-scale/color-scale.component'
import { TagInputModule } from 'ngx-chips'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [ColorScaleComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    UtilSharedModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
})
export class UiWidgetsModule {}
