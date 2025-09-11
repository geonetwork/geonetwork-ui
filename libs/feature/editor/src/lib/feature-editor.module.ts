import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { EditorEffects } from './+state/editor.effects'
import { EditorFacade } from './+state/editor.facade'
import * as fromEditor from './+state/editor.reducer'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'

@NgModule({
  imports: [
    MatFormFieldModule,
    HttpClientModule,
    HttpClientXsrfModule,
    StoreModule.forFeature(
      fromEditor.EDITOR_FEATURE_KEY,
      fromEditor.editorReducer
    ),
    EffectsModule.forFeature([EditorEffects]),
  ],
  providers: [EditorFacade, Gn4PlatformService],
})
export class FeatureEditorModule {}
