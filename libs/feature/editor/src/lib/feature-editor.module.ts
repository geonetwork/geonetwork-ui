import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { TextInputComponent, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import { EditorEffects } from './+state/editor.effects'
import { EditorFacade } from './+state/editor.facade'
import * as fromEditor from './+state/editor.reducer'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'

@NgModule({
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
    TextInputComponent,
  ],
  providers: [EditorFacade, Gn4PlatformService],
})
export class FeatureEditorModule {}
