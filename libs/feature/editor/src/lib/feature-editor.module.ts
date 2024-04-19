import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import { EditorEffects } from './+state/editor.effects'
import { EditorFacade } from './+state/editor.facade'
import * as fromEditor from './+state/editor.reducer'
import { WizardFieldComponent } from './components/wizard-field/wizard-field.component'
import { WizardSummarizeComponent } from './components/wizard-summarize/wizard-summarize.component'
import { WizardComponent } from './components/wizard/wizard.component'

@NgModule({
  declarations: [
    WizardComponent,
    WizardFieldComponent,
    WizardSummarizeComponent,
  ],
  imports: [
    CommonModule,
    UiInputsModule,
    UiWidgetsModule,
    TranslateModule.forChild(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    HttpClientModule,
    HttpClientXsrfModule,
    StoreModule.forFeature(
      fromEditor.EDITOR_FEATURE_KEY,
      fromEditor.editorReducer
    ),
    EffectsModule.forFeature([EditorEffects]),
  ],
  exports: [WizardComponent, WizardSummarizeComponent],
  providers: [EditorFacade],
})
export class FeatureEditorModule {}
export * from './models/index'
export * from './services/wizard.service'
