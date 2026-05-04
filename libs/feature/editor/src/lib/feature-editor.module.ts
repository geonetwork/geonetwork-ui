import { provideHttpClient } from '@angular/common/http'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { EditorEffects } from './+state/editor.effects'
import { EditorFacade } from './+state/editor.facade'
import * as fromEditor from './+state/editor.reducer'
import { EditorSettings, EDITOR_SETTINGS } from './editor-settings'

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromEditor.EDITOR_FEATURE_KEY,
      fromEditor.editorReducer
    ),
    EffectsModule.forFeature([EditorEffects]),
  ],
  providers: [EditorFacade, provideHttpClient()],
})
export class FeatureEditorModule {
  static withConfig(
    settings: EditorSettings
  ): ModuleWithProviders<FeatureEditorModule> {
    return {
      ngModule: FeatureEditorModule,
      providers: [{ provide: EDITOR_SETTINGS, useValue: settings }],
    }
  }
}
