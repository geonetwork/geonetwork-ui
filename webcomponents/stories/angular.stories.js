import { moduleMetadata, storiesOf } from '@storybook/angular'
import { color, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import {GnSearchInputComponent} from '../gn-search-input/src/app/gn-search-input.component'
import {GnSearchInputModule} from '../gn-search-input/src/app/gn-search-input.module'

const moduleMetadatas = {
  imports: [GnSearchInputModule],
}

storiesOf('Angular components', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('Search Input', () => ({
    component: GnSearchInputComponent,
    props: {
      primaryColor: color('Primary Color', 'blue'),
      secondaryColor: color('Secondary Color', 'grey'),
    },
  }))
