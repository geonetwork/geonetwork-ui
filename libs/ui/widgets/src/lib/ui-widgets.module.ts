import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { TagInputModule } from 'ngx-chips'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ColorScaleComponent } from './color-scale/color-scale.component'
import { StepBarComponent } from './step-bar/step-bar.component'

@NgModule({
  declarations: [ColorScaleComponent, StepBarComponent],
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
  exports: [StepBarComponent],
})
export class UiWidgetsModule {}
