import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ColorScaleComponent } from './color-scale/color-scale.component'
import { ProgressBarComponent } from './progress-bar/progress-bar.component'
import { StepBarComponent } from './step-bar/step-bar.component'
import { TagInputModule } from 'ngx-chips'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ColorScaleComponent, ProgressBarComponent, StepBarComponent],
  imports: [
    BrowserModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    UtilSharedModule,
  ],
  exports: [ProgressBarComponent, StepBarComponent],
})
export class UiWidgetsModule {}
