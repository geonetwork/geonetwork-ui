import { provideHttpClient } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { EditorEffects } from './+state/editor.effects.js'
import { EditorFacade } from './+state/editor.facade.js'
import * as fromEditor from './+state/editor.reducer.js'

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
export class FeatureEditorModule {}
