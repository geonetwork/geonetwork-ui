import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { ChipsInputComponent } from './chips-input.component'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TagInputModule } from 'ngx-chips'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/ChipsInputComponent',
  component: ChipsInputComponent,
  decorators: [
    moduleMetadata({
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
    }),
  ],
} as Meta<ChipsInputComponent>

const Template: Story<ChipsInputComponent> = (args: ChipsInputComponent) => ({
  component: ChipsInputComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  selectedItems: [{ display: 'item1', value: 'item1' }],
  autocompleteItems: [
    { display: 'item1', value: 'item1' },
    { display: 'item2', value: 'item2' },
  ],
  placeholder: 'Select tag here!',
  url: () => 'url',
}
Primary.argTypes = {
  itemsChange: {
    action: 'itemsChange',
  },
}
