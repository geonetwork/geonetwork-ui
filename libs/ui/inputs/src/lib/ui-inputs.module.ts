import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { TagInputModule } from 'ngx-chips'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { ButtonComponent } from './button/button.component'
import { ChipsInputComponent } from './chips-input/chips-input.component'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input/drag-and-drop-file-input.component'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { TextInputComponent } from './text-input/text-input.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { NavigationButtonComponent } from './navigation-button/navigation-button.component'
import { StarToggleComponent } from './star-toggle/star-toggle.component'
import { DropdownMultiselectComponent } from './dropdown-multiselect/dropdown-multiselect.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { ViewportIntersectorComponent } from './viewport-intersector/viewport-intersector.component'
import { CheckToggleComponent } from './check-toggle/check-toggle.component'
import { CopyTextButtonComponent } from './copy-text-button/copy-text-button.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { CommonModule } from '@angular/common'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { SearchInputComponent } from './search-input/search-input.component'
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { EditableLabelDirective } from './editable-label/editable-label.directive'
import { ImageInputComponent } from './image-input/image-input.component'

@NgModule({
  declarations: [
    AutocompleteComponent,
    TextInputComponent,
    DragAndDropFileInputComponent,
    ChipsInputComponent,
    NavigationButtonComponent,
    StarToggleComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
    CopyTextButtonComponent,
    CheckboxComponent,
    SearchInputComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    UtilSharedModule,
    MatAutocompleteModule,
    MatIconModule,
    UiWidgetsModule,
    OverlayModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EditableLabelDirective,
    TextAreaComponent,
    ButtonComponent,
    ImageInputComponent,
    DropdownSelectorComponent,
    DateRangePickerComponent,
    CheckToggleComponent,
  ],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    DragAndDropFileInputComponent,
    TextAreaComponent,
    ChipsInputComponent,
    NavigationButtonComponent,
    StarToggleComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
    CheckToggleComponent,
    CopyTextButtonComponent,
    CheckboxComponent,
    SearchInputComponent,
    DateRangePickerComponent,
    EditableLabelDirective,
    ImageInputComponent,
  ],
})
export class UiInputsModule {}
