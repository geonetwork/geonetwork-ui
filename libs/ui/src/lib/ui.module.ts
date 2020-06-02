import { NgModule } from '@angular/core'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  declarations: [DropdownSelectorComponent],
  imports: [NgbModule, BrowserModule],
  exports: [DropdownSelectorComponent],
})
export class UiModule {}
