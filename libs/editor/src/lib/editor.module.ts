import { NgModule } from '@angular/core'
import { WizardComponent } from './components/wizard/wizard.component'
import { WizardFieldComponent } from './components/wizard-field/wizard-field.component'
import { UiModule } from '../../../ui/src'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [WizardComponent, WizardFieldComponent],
  imports: [BrowserModule, UiModule, TranslateModule.forChild()],
  exports: [WizardComponent],
})
export class EditorModule {}
