import { NgModule } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field'
import { WizardComponent } from './components/wizard/wizard.component'
import { WizardFieldComponent } from './components/wizard-field/wizard-field.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { WizardSummarizeComponent } from './components/wizard-summarize/wizard-summarize.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    WizardComponent,
    WizardFieldComponent,
    WizardSummarizeComponent,
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
  ],
  exports: [WizardComponent, WizardSummarizeComponent],
})
export class FeatureEditorModule {}
export * from './services/wizard.service'
export * from './models/index'
