import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import {
  I18nModule,
  TRANSLATE_DEFAULT_CONFIG,
} from '../../../../../libs/common/src'
import { ES_FIXTURE_AGGS_REQUEST } from '../../../../../libs/search/src/lib/elasticsearch/fixtures'
import { GnWcModule } from '../../gn-wc.module'
import { GnFacetsComponent } from './gn-facets.component'

const moduleMetadatas = {
  imports: [
    I18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    GnWcModule,
  ],
}

export default {
  title: '_Web Component/Facets',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const AngularGnFacetsStory = () => ({
  component: GnFacetsComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    facetConfig: JSON.stringify(ES_FIXTURE_AGGS_REQUEST),
  },
})
AngularGnFacetsStory.storyName = 'Simple terms'
