import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { object, text, withKnobs } from '@storybook/addon-knobs'
import { ChipsInputComponent } from './chips-input.component'
import { UtilI18nModule, TRANSLATE_DEFAULT_CONFIG } from '../../../../common/src'
import { TagInputModule } from 'ngx-chips'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { moduleMetadata } from '@storybook/angular'

const moduleMetadatas = {
  imports: [
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const ChipsInput = () => ({
  component: ChipsInputComponent,
  props: {
    selectedItems: object('input values', [
      { display: 'item1', value: 'item1' },
    ]),
    autocompleteItems: object('autocomplete values', [
      { display: 'item1', value: 'item1' },
      { display: 'item2', value: 'item2' },
    ]),
    change: action('output'),
    placeholder: text('chips placeholder', 'Select tag here!'),
  },
})
ChipsInput.storyName = 'Chips input'
