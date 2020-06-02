import { NgModule } from '@angular/core'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'

@NgModule({
  declarations: [DropdownSelectorComponent, AutocompleteComponent],
  imports: [NgbModule, BrowserModule],
  exports: [DropdownSelectorComponent, AutocompleteComponent],
})
export class UiModule {}
