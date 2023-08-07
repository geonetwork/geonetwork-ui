import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import {
  FormFieldArrayComponent,
  FormFieldComponent,
  FormFieldFileComponent,
  FormFieldObjectComponent,
  FormFieldRichComponent,
  FormFieldSimpleComponent,
  FormFieldSpatialExtentComponent,
  FormFieldTemporalExtentComponent,
} from './form-field'
import { CheckToggleComponent } from './check-toggle/check-toggle.component'
import { CopyTextButtonComponent } from './copy-text-button/copy-text-button.component'
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  declarations: [
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
    FormFieldComponent,
    FormFieldSimpleComponent,
    FormFieldArrayComponent,
    FormFieldObjectComponent,
    FormFieldRichComponent,
    FormFieldFileComponent,
    FormFieldSpatialExtentComponent,
    FormFieldTemporalExtentComponent,
    CheckToggleComponent,
    CopyTextButtonComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    BrowserAnimationsModule,
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
    FormFieldComponent,
    CheckToggleComponent,
    CopyTextButtonComponent,
  ],
})
export class UiInputsModule {}
