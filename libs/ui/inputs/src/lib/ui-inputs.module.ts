import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matClose,
  matExpandLess,
  matExpandMore,
} from '@ng-icons/material-icons/baseline'
import { TranslateModule } from '@ngx-translate/core'
import { TagInputModule } from 'ngx-chips'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { BadgeComponent } from './badge/badge.component'
import { ButtonComponent } from './button/button.component'
import { CheckToggleComponent } from './check-toggle/check-toggle.component'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { ChipsInputComponent } from './chips-input/chips-input.component'
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input/drag-and-drop-file-input.component'
import { DropdownMultiselectComponent } from './dropdown-multiselect/dropdown-multiselect.component'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { EditableLabelDirective } from './editable-label/editable-label.directive'
import { TextAreaComponent } from './text-area/text-area.component'
import { ViewportIntersectorComponent } from './viewport-intersector/viewport-intersector.component'

@NgModule({
  declarations: [
    DragAndDropFileInputComponent,
    ChipsInputComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
    CheckboxComponent,
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
    DropdownSelectorComponent,
    DateRangePickerComponent,
    CheckToggleComponent,
    BadgeComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      matClose,
      matExpandMore,
      matExpandLess,
    }),
    provideNgIconsConfig({
      size: '0.9em',
    }),
  ],
  exports: [
    DropdownSelectorComponent,
    ButtonComponent,
    DragAndDropFileInputComponent,
    TextAreaComponent,
    ChipsInputComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
    CheckToggleComponent,
    CheckboxComponent,
    DateRangePickerComponent,
    EditableLabelDirective,
    BadgeComponent,
  ],
})
export class UiInputsModule {}
