import { NgModule } from '@angular/core'
import { GnApiModule } from '@lib/gn-api'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { BrowserModule } from '@angular/platform-browser'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { RecordSummaryComponent } from './record-summary/record-summary.component'
import { ButtonComponent } from './button/button.component'

@NgModule({
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    RecordSummaryComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, GnApiModule],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    RecordSummaryComponent,
    ButtonComponent,
  ],
})
export class UiModule {}
