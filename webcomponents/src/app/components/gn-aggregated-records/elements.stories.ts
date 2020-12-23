import { moduleMetadata } from '@storybook/angular'
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

const moduleMetadatas = {
  schemas: [NO_ERRORS_SCHEMA],
}

export default {
  title: 'Aggregated records',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const GnAggregatedRecordsStory = () => ({
  template: `
<gn-aggregated-records
  api-url="https://apps.titellus.net/geonetwork/srv/api"
  primary-color="#e73f51"
  secondary-color="#c2e9dc"
  main-color="#212029"
  background-color="#fdfbff">
</gn-aggregated-records>`,
  props: {
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
GnAggregatedRecordsStory.storyName = 'Component'
