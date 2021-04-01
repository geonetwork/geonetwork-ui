import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { BrowserModule } from '@angular/platform-browser'
import { I18nModule, TRANSLATE_GEONETWORK_CONFIG } from '@lib/common'
import { LibSearchModule } from '@lib/search'
import { UiModule } from '@lib/ui'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { metaReducers } from '../../../search/src/app/app.module'
import { environment } from '../../../search/src/environments/environment'

import { AppComponent } from './app.component'
import { SearchInputComponent } from './components/search-input/search-input.component'
import { MdVisuComponent } from './components/md-visu/md-visu.component'
import { SummaryComponent } from './components/summary/summary.component'
import { MapComponent } from './components/map/map.component'
import { GridComponent } from './components/grid/grid.component'
import { ResourcesComponent } from './components/resources/resources.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    MdVisuComponent,
    SummaryComponent,
    MapComponent,
    GridComponent,
    ResourcesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatTableModule,
    MatIconModule,
    LibSearchModule,
    MatTabsModule,
    MatSortModule,
    MatButtonModule,
    UiModule,
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
