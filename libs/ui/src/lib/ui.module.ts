import { NgModule } from '@angular/core'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { BrowserModule } from '@angular/platform-browser'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { RecordSummaryComponent } from './record-summary/record-summary.component'
import { ButtonComponent } from './button/button.component'
import { TextInputComponent } from './text-input/text-input.component'
import { ColorScaleComponent } from './color-scale/color-scale.component'

@NgModule({
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    RecordSummaryComponent,
    ButtonComponent,
    TextInputComponent,
    ColorScaleComponent,
  ],
  imports: [BrowserModule],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    RecordSummaryComponent,
    ButtonComponent,
    TextInputComponent,
  ],
})
export class UiModule {}
