import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { AngularMyDatePickerModule } from 'angular-mydatepicker'
import { TagInputModule } from 'ngx-chips'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { ButtonComponent } from './button/button.component'
import { ChipsInputComponent } from './chips-input/chips-input.component'
import { DatepickerComponent } from './datepicker/datepicker.component'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input/drag-and-drop-file-input.component'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { TextInputComponent } from './text-input/text-input.component'
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { NavigationButtonComponent } from './navigation-button/navigation-button.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { StarToggleComponent } from './star-toggle/star-toggle.component'
import { DropdownMultiselectComponent } from './dropdown-multiselect/dropdown-multiselect.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox'
import { ViewportIntersectorComponent } from './viewport-intersector/viewport-intersector.component'

@NgModule({
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    DragAndDropFileInputComponent,
    TextAreaComponent,
    ChipsInputComponent,
    DatepickerComponent,
    NavigationButtonComponent,
    StarToggleComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    AngularMyDatePickerModule,
    UtilSharedModule,
    MatAutocompleteModule,
    MatIconModule,
    UiWidgetsModule,
    OverlayModule,
    MatCheckboxModule,
  ],
  exports: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    TextInputComponent,
    DragAndDropFileInputComponent,
    TextAreaComponent,
    ChipsInputComponent,
    DatepickerComponent,
    NavigationButtonComponent,
    StarToggleComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
  ],
})
export class UiInputsModule {}
