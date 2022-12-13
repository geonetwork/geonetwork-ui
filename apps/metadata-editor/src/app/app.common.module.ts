import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import { ThemeService } from '@geonetwork-ui/util/shared'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { extModules } from './build-specifics'

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot(),
    extModules,
  ],
  exports: [MatIconModule],
  providers: [
    {
      provide: Configuration,
      useFactory: () =>
        new Configuration({
          basePath: getGlobalConfig().GN4_API_URL,
        }),
    },
  ],
})
export class AppCommonModule {
  constructor() {
    ThemeService.applyCssVariables(
      getThemeConfig().PRIMARY_COLOR,
      getThemeConfig().SECONDARY_COLOR,
      getThemeConfig().MAIN_COLOR || '#475569',
      getThemeConfig().BACKGROUND_COLOR,
      getThemeConfig().MAIN_FONT || "'Rubik', sans-serif",
      getThemeConfig().TITLE_FONT || "'Readex Pro', sans-serif",
      getThemeConfig().FONTS_STYLESHEET_URL ||
        'https://fonts.googleapis.com/css2?family=Readex+Pro&family=Rubik&display=swap'
    )
  }
}
