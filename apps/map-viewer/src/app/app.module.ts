import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { ThemeService } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FeatureMapModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ThemeService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }
}
