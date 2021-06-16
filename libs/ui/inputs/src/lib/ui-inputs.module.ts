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
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'

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
  ],
})
export class UiInputsModule {}
