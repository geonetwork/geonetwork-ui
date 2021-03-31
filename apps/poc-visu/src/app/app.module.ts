import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { BrowserModule } from '@angular/platform-browser'
import { I18nModule, TRANSLATE_GEONETWORK_CONFIG } from '@lib/common'
import { LibSearchModule } from '@lib/search'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { metaReducers } from '../../../search/src/app/app.module'
import { environment } from '../../../search/src/environments/environment'

import { AppComponent } from './app.component'
import { SearchInputComponent } from './components/search-input/search-input.component'

@NgModule({
  declarations: [AppComponent, SearchInputComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    LibSearchModule,
    I18nModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    TranslateModule.forRoot(TRANSLATE_GEONETWORK_CONFIG),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
