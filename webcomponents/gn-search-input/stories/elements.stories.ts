import { moduleMetadata, storiesOf } from '@storybook/angular'
import { color, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { NO_ERRORS_SCHEMA } from '@angular/core'

// import compiled webcomponents here
// TODO: write a script to concatenate all these
import '../dist/runtime'
import '../dist/main'
import '../dist/polyfills'

const moduleMetadatas = {
  schemas: [NO_ERRORS_SCHEMA],
}

storiesOf('Webcomponents', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('Search Snapshot', () => ({
    template: `
<gn-search-input
  primary-color="{{primaryColor}}"
  secondary-color="{{secondaryColor}}">
</gn-search-input>`,
    props: {
      primaryColor: color('Primary Color', 'blue'),
      secondaryColor: color('Secondary Color', 'grey'),
    },
  }))
