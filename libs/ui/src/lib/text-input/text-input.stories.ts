import { moduleMetadata, storiesOf } from '@storybook/angular'
import { text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withA11y } from '@storybook/addon-a11y'
import { UiModule } from '@lib/ui'
import { TextInputComponent } from './text-input.component'

const moduleMetadatas = {
  imports: [UiModule],
}

storiesOf('Presentation components', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('TextInputComponent', () => ({
    component: TextInputComponent,
    props: {
      value: text('input value', ''),
      change: action('output'),
      hint: text('input hint', 'Put something here!'),
    },
  }))
