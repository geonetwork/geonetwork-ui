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
import { RecordPreviewTitleComponent } from './record-preview-title/record-preview-title.component'
import { ResultsHitsNumberComponent } from './results-hits-number/results-hits-number.component'
import { ResultsListComponent } from './results-list/results-list.component'
import { TextInputComponent } from './text-input/text-input.component'
import { RecordPreviewComponent } from './record-preview/record-preview.component'
import { RecordThumbnailComponent } from './record-thumbnail/record-thumbnail.component'
import { StepBarComponent } from './step-bar/step-bar.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { TagInputModule } from 'ngx-chips'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChipsInputComponent } from './chips-input/chips-input.component';
import { DatepickerComponent } from './datepicker/datepicker.component'
import {MyDatePickerModule} from 'mydatepicker'

@NgModule({
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    ColorScaleComponent,
    RecordPreviewComponent,
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordPreviewTitleComponent,
    RecordMetricComponent,
    RecordThumbnailComponent,
    ResultsListComponent,
    CatalogTitleComponent,
    DragAndDropFileInputComponent,
    ProgressBarComponent,
    StepBarComponent,
    TextAreaComponent,
    ChipsInputComponent,
    DatepickerComponent,
    ResultsHitsNumberComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FacetsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    MyDatePickerModule
  ],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    RecordPreviewListComponent,
    RecordPreviewCardComponent,
    RecordPreviewTextComponent,
    RecordPreviewTitleComponent,
    RecordMetricComponent,
    RecordThumbnailComponent,
    ResultsListComponent,
    CatalogTitleComponent,
    DragAndDropFileInputComponent,
    ProgressBarComponent,
    FacetsModule,
    RecordPreviewComponent,
    StepBarComponent,
    TextAreaComponent,
    ChipsInputComponent,
    DatepickerComponent,
    ResultsHitsNumberComponent,
  ],
})
export class UiModule {}
