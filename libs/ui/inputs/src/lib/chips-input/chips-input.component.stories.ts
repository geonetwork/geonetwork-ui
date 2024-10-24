import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ChipsInputComponent } from './chips-input.component'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  DeleteIconComponent,
  TagComponent,
  TagInputComponent,
  TagInputModule,
} from 'ngx-chips'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Inputs/ChipsInputComponent',
  component: ChipsInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [TagInputComponent, TagComponent, DeleteIconComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(
          BrowserModule,
          BrowserAnimationsModule,
          CommonModule,
          TagInputModule
        ),
      ],
    }),
  ],
} as Meta<ChipsInputComponent>

export const Primary: StoryObj<ChipsInputComponent> = {
  args: {
    selectedItems: [{ display: 'item1', value: 'item1' }],
    autocompleteItems: [
      { display: 'item1', value: 'item1' },
      { display: 'item2', value: 'item2' },
    ],
    placeholder: 'Select tag here!',
    url: () => 'url',
  },
  argTypes: {
    itemsChange: {
      action: 'itemsChange',
    },
  },
}
