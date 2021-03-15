import { NgModule } from '@angular/core'
import { WizardComponent } from './components/wizard/wizard.component'
import { WizardFieldComponent } from './components/wizard-field/wizard-field.component'
import { UiModule } from '../../../ui/src'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { WizardSummarizeComponent } from './components/wizard-summarize/wizard-summarize.component'
import { WizardService } from './services/wizard.service'

@NgModule({
  declarations: [
    WizardComponent,
    WizardFieldComponent,
    WizardSummarizeComponent,
  ],
  imports: [BrowserModule, UiModule, TranslateModule.forChild()],
  exports: [WizardComponent, WizardSummarizeComponent],
})
export class EditorModule {}
export * from './services/wizard.service'
export * from './models/index'
