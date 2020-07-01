import { moduleMetadata, storiesOf } from '@storybook/angular'
import { color, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { NO_ERRORS_SCHEMA } from '@angular/core'

// import compiled webcomponents here
// TODO: write a script to concatenate all these
import '../dist/runtime-es2015'
import '../dist/main-es2015'
import '../dist/polyfills-es2015'
import '../dist/vendor-es2015'
import '../dist/styles-es2015'

const moduleMetadatas = {
  schemas: [NO_ERRORS_SCHEMA],
}

storiesOf('Webcomponents', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('Search Snapshot', () => ({
    template: `
<gn-search-snapshot
  primary-color="{{primaryColor}}"
  secondary-color="{{secondaryColor}}">
</gn-search-snapshot>`,
    props: {
      primaryColor: color('Primary Color', 'blue'),
      secondaryColor: color('Secondary Color', 'grey'),
    },
  }))
