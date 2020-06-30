import { NgModule } from '@angular/core'
import { GnApiModule } from '@lib/gn-api'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { BrowserModule } from '@angular/platform-browser'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { RecordSummaryComponent } from './record-summary/record-summary.component'
import { ButtonComponent } from './button/button.component'
import { TextInputComponent } from './text-input/text-input.component'

@NgModule({
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    RecordSummaryComponent,
    ButtonComponent,
    TextInputComponent,
  ],
  imports: [BrowserModule, GnApiModule],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    RecordSummaryComponent,
    ButtonComponent,
    TextInputComponent,
  ],
})
export class UiModule {}
