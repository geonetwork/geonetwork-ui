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
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { RecordFieldObjectComponent } from './components/record-field-object/record-field-object.component'
import { matDeleteForeverSharp } from '@ng-icons/material-icons/sharp'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

@NgModule({
  declarations: [
    AppComponent,
    RecordFormComponent,
    RecordOutputXmlComponent,
    StatusComponent,
    RecordFieldSimpleComponent,
    RecordFieldGroupComponent,
    RecordFieldArrayComponent,
    RecordFieldObjectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // FIXME: these imports are required by non-standalone components and should be removed once all components have been made standalone
    NgIconsModule.withIcons({
      matDeleteForeverSharp,
    }),
    ButtonComponent,
  ],
  providers: [
    provideI18n(),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
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
