import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { LetDirective } from '@ngrx/component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import {
  EDITOR_DASHBOARD_FEATURE_STATE_KEY,
  reducer,
} from '../dashboard/+state/dashboard.reducer'
import { AllRecordsComponent } from './all-records-list.component'

@NgModule({
  declarations: [AllRecordsComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    FeatureSearchModule,
    UiElementsModule,
    UiSearchModule,
    LetDirective,
    StoreModule.forFeature(EDITOR_DASHBOARD_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature(),
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
  ],
  exports: [AllRecordsComponent],
})
export class AllRecordsModule {}
