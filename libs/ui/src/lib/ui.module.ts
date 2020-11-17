import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { BrowserModule } from '@angular/platform-browser'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { ButtonComponent } from './button/button.component'
import { ResultsListComponent } from './results-list/results-list.component'
import { TextInputComponent } from './text-input/text-input.component'
import { ColorScaleComponent } from './color-scale/color-scale.component'
import { RecordPreviewListComponent } from './record-preview-list/record-preview-list.component'
import { RecordPreviewCardComponent } from './record-preview-card/record-preview-card.component'
import { RecordPreviewTextComponent } from './record-preview-text/record-preview-text.component'
import { RecordMetricComponent } from './record-metric/record-metric.component'
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input/drag-and-drop-file-input.component'
import { ProgressBarComponent } from './progress-bar/progress-bar.component'

@NgModule({
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    ColorScaleComponent,
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordMetricComponent,
    ResultsListComponent,
    CatalogTitleComponent,
    DragAndDropFileInputComponent,
    ProgressBarComponent,
  ],
  imports: [BrowserModule, TranslateModule.forChild(), NgxDropzoneModule],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordMetricComponent,
    ResultsListComponent,
    CatalogTitleComponent,
    DragAndDropFileInputComponent,
    ProgressBarComponent,
  ],
})
export class UiModule {}
