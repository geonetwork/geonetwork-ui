import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { color, text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import {
  I18nModule,
  TRANSLATE_DEFAULT_CONFIG,
} from '../../../../../libs/common/src'
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
  title: '_Web Component/Results list',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const AngularGnResultsListListStory = () => ({
  component: GnFacetsComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'LIST',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListListStory.storyName = 'List'

export const AngularGnResultsListBlockStory = () => ({
  component: GnFacetsComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'BLOCK',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListBlockStory.storyName = 'Block'

export const AngularGnResultsListTextStory = () => ({
  component: GnFacetsComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'TEXT',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListTextStory.storyName = 'Text'

export const AngularGnResultsListTitleStory = () => ({
  component: GnFacetsComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'TITLE',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListTitleStory.storyName = 'Title'
