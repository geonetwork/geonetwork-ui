import { moduleMetadata } from '@storybook/angular'
import { color, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { NO_ERRORS_SCHEMA } from '@angular/core'
// import compiled webcomponents here
// TODO: write a script to concatenate all these
import '../dist/runtime'
import '../dist/main'
import '../dist/polyfills'
import '../dist/vendor'
import '../dist/styles'

const moduleMetadatas = {
  schemas: [NO_ERRORS_SCHEMA],
}

export default {
  title: 'Search input',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const GnSearchInputStory = () => ({
  template: `
<gn-search-input
  primary-color="{{primaryColor}}"
  secondary-color="{{secondaryColor}}">
</gn-search-input>`,
  props: {
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
GnSearchInputStory.storyName= 'Search input'
