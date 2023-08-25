import { NgModule } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { WizardComponent } from './components/wizard/wizard.component'
import { WizardFieldComponent } from './components/wizard-field/wizard-field.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui-widgets'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { WizardSummarizeComponent } from './components/wizard-summarize/wizard-summarize.component'
import { CommonModule } from '@angular/common'
import { RecordFormComponent } from './record-form/record-form.component'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'

@NgModule({
  declarations: [
    WizardComponent,
    WizardFieldComponent,
    WizardSummarizeComponent,
    RecordFormComponent,
  ],
  imports: [
    BrowserModule,
    UiInputsModule,
    UiWidgetsModule,
    TranslateModule.forChild(),
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    HttpClientModule,
    HttpClientXsrfModule,
  ],
  exports: [WizardComponent, WizardSummarizeComponent, RecordFormComponent],
})
export class FeatureEditorModule {}
export * from './services/wizard.service'
export * from './models/index'
