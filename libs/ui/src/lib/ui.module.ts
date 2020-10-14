import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { BrowserModule } from '@angular/platform-browser'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { ButtonComponent } from './button/button.component'
import { ResultsListComponent } from './results-list/results-list.component'
import { TextInputComponent } from './text-input/text-input.component'
import { ColorScaleComponent } from './color-scale/color-scale.component'
import { RecordPreviewListComponent } from './record-preview-list/record-preview-list.component'
import { RecordMetricComponent } from './record-metric/record-metric.component'

@NgModule({
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    ColorScaleComponent,
    RecordPreviewListComponent,
    RecordMetricComponent,
    ResultsListComponent,
  ],
  imports: [BrowserModule, TranslateModule.forChild()],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    RecordPreviewListComponent,
    RecordMetricComponent,
    ResultsListComponent,
  ],
})
export class UiModule {}
