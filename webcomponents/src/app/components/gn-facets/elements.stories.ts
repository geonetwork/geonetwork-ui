import { color, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { NO_ERRORS_SCHEMA } from '@angular/core'
// import compiled webcomponents here
// TODO: write a script to concatenate all these
import '../../../../dist/runtime'
import '../../../../dist/main'
import '../../../../dist/polyfills'
import '../../../../dist/vendor'
import '../../../../dist/styles'
import { moduleMetadata } from '@storybook/angular'

const moduleMetadatas = {
  schemas: [NO_ERRORS_SCHEMA],
}

export default {
  title: 'Results list',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const GnResultsListListStory = () => ({
  template: `
<gn-results-list
  api-url="https://apps.titellus.net/geonetwork/srv/api"
  primary-color="{{primaryColor}}"
  layout="LIST"
  secondary-color="{{secondaryColor}}">
</gn-results-list>`,
  props: {
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
GnResultsListListStory.storyName = 'List'

export const GnResultsListCardStory = () => ({
  template: `
<gn-results-list
  api-url="https://apps.titellus.net/geonetwork/srv/api"
  primary-color="{{primaryColor}}"
  layout="CARD"
  secondary-color="{{secondaryColor}}">
</gn-results-list>`,
  props: {
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
GnResultsListCardStory.storyName = 'Card'

export const GnResultsListTextStory = () => ({
  template: `
<gn-results-list
  api-url="https://apps.titellus.net/geonetwork/srv/api"
  primary-color="{{primaryColor}}"
  layout="TEXT"
  secondary-color="{{secondaryColor}}">
</gn-results-list>`,
  props: {
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
GnResultsListTextStory.storyName = 'Text'

export const GnResultsListTitleStory = () => ({
  template: `
<gn-results-list
  api-url="https://apps.titellus.net/geonetwork/srv/api"
  primary-color="{{primaryColor}}"
  layout="TITLE"
  secondary-color="{{secondaryColor}}">
</gn-results-list>`,
  props: {
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
GnResultsListTitleStory.storyName = 'Title'
