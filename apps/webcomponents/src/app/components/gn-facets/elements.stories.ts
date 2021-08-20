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
  title: 'Facets',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const GnFacetsStory = () => ({
  template: `
    <gn-facets
      api-url="https://apps.titellus.net/geonetwork/srv/api"
      facet-config='{"tag.default":{"terms":{"field":"tag.default","include":".*","size": 10}}}'
    ></gn-facets>
`,
  props: {
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
GnFacetsStory.storyName = 'Simple terms'
