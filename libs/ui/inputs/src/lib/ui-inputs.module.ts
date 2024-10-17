import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { TagInputModule } from 'ngx-chips'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ButtonComponent } from './button/button.component'
import { BadgeComponent } from './badge/badge.component'
import { ChipsInputComponent } from './chips-input/chips-input.component'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input/drag-and-drop-file-input.component'
import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
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
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { EditableLabelDirective } from './editable-label/editable-label.directive'
import { ImageInputComponent } from './image-input/image-input.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matExpandMore,
  matExpandLess,
  matStar,
  matStarBorder,
  matClose,
  matContentCopy,
  matArrowBack,
} from '@ng-icons/material-icons/baseline'

@NgModule({
  declarations: [
    DragAndDropFileInputComponent,
    ChipsInputComponent,
    NavigationButtonComponent,
    StarToggleComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
    CopyTextButtonComponent,
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
    ImageInputComponent,
    DropdownSelectorComponent,
    DateRangePickerComponent,
    CheckToggleComponent,
    BadgeComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      matStar,
      matStarBorder,
      matClose,
      matExpandMore,
      matExpandLess,
      matContentCopy,
      matArrowBack,
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
    NavigationButtonComponent,
    StarToggleComponent,
    DropdownMultiselectComponent,
    ViewportIntersectorComponent,
    CheckToggleComponent,
    CopyTextButtonComponent,
    CheckboxComponent,
    DateRangePickerComponent,
    EditableLabelDirective,
    ImageInputComponent,
    BadgeComponent,
  ],
})
export class UiInputsModule {}
