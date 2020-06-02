import { NgModule } from '@angular/core'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser'
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [DropdownSelectorComponent],
  imports: [NgbModule, BrowserModule, TranslateModule],
  exports: [DropdownSelectorComponent],
})
export class UiModule {}
