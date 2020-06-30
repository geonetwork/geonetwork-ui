import { DropdownSelectorComponent } from './dropdown-selector.component'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { object, text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withA11y } from '@storybook/addon-a11y'
import { UiModule } from '@lib/ui'

const moduleMetadatas = {
  imports: [UiModule],
}

storiesOf('Presentation components', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('DropdownSelectorComponent', () => ({
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
  }))
