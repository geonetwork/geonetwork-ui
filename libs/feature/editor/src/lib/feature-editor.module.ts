import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { EditorEffects } from './+state/editor.effects'
import { EditorFacade } from './+state/editor.facade'
import * as fromEditor from './+state/editor.reducer'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'

@NgModule({
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
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
