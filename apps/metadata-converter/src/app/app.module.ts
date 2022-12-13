import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { RecordFormComponent } from './components/record-form/record-form.component'
import { RecordOutputXmlComponent } from './components/record-output-xml/record-output-xml.component'
import { FormsModule } from '@angular/forms'
import { StatusComponent } from './components/status/status.component'
import { ThemeService } from '@geonetwork-ui/util/shared'
import { RecordFieldSimpleComponent } from './components/record-field-simple/record-field-simple.component'
import { RecordFieldGroupComponent } from './components/record-field-group/record-field-group.component'
import { RecordFieldArrayComponent } from './components/record-field-array/record-field-array.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { HttpClientModule } from '@angular/common/http'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    RecordFormComponent,
    RecordOutputXmlComponent,
    StatusComponent,
    RecordFieldSimpleComponent,
    RecordFieldGroupComponent,
    RecordFieldArrayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiInputsModule,
    HttpClientModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RecordFormComponent],
})
export class AppModule {
  constructor() {
    ThemeService.applyCssVariables(
      '#c82850',
      '#001638',
      '#212029',
      '#fdfbff',
      "'Rubik', sans-serif",
      "'Readex Pro', sans-serif",
      'https://fonts.googleapis.com/css2?family=Readex+Pro&family=Rubik&display=swap'
    )
  }
}
