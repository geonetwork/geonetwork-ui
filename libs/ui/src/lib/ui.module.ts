import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { ButtonComponent } from './button/button.component'
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'
import { ColorScaleComponent } from './color-scale/color-scale.component'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input/drag-and-drop-file-input.component'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { FacetsModule } from './facets/facets.module'
import { ProgressBarComponent } from './progress-bar/progress-bar.component'
import { RecordMetricComponent } from './record-metric/record-metric.component'
import { RecordPreviewCardComponent } from './record-preview-card/record-preview-card.component'
import { RecordPreviewListComponent } from './record-preview-list/record-preview-list.component'
import { RecordPreviewTextComponent } from './record-preview-text/record-preview-text.component'
import { ResultsListComponent } from './results-list/results-list.component'
import { TextInputComponent } from './text-input/text-input.component'
import { RecordPreviewComponent } from './record-preview/record-preview.component'
import { RecordThumbnailComponent } from './record-thumbnail/record-thumbnail.component'

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
    RecordThumbnailComponent,
    ResultsListComponent,
    CatalogTitleComponent,
    DragAndDropFileInputComponent,
    ProgressBarComponent,
    RecordPreviewComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FacetsModule,
  ],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordMetricComponent,
    RecordThumbnailComponent,
    ResultsListComponent,
    CatalogTitleComponent,
    DragAndDropFileInputComponent,
    ProgressBarComponent,
    FacetsModule,
    RecordPreviewComponent,
  ],
})
export class UiModule {}
