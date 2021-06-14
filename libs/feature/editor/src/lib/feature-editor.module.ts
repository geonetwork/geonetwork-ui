import { NgModule } from '@angular/core'
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
  imports: [BrowserModule, UiInputsModule, UiWidgetsModule, TranslateModule.forChild(), CommonModule],
  exports: [WizardComponent, WizardSummarizeComponent],
})
export class FeatureEditorModule {}
export * from './services/wizard.service'
export * from './models/index'
