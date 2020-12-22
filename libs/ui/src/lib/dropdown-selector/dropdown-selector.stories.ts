import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { object, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { DropdownSelectorComponent } from './dropdown-selector.component'

const moduleMetadatas = {
  imports: [TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const DropdownSelectorStory = () => ({
  component: DropdownSelectorComponent,
  props: {
    title: text('title', 'my title'),
    ariaName: text('aria name', 'select-dropdown'),
    choices: object('choices', [
      {
        label: 'My Choice 1',
        value: 'choice1',
      },
      {
        label: 'My Choice 2',
        value: 'choice2',
      },
      {
        label: 'My Choice 3',
        value: 'choice3',
      },
    ]),
    selected: text('selected value', 'choice1'),
    selectValue: action('output'),
  },
})
DropdownSelectorStory.storyName = 'Dropdown selector'
