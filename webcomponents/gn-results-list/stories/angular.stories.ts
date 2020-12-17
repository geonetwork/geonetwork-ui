import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { color, text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { I18nModule, TRANSLATE_DEFAULT_CONFIG } from '../../../libs/common/src'
import { GnResultsListComponent } from '../src/app/gn-results-list.component'
import { GnResultsListModule } from '../src/app/gn-results-list.module'

const moduleMetadatas = {
  imports: [
    I18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    GnResultsListModule,
  ],
}

export default {
  title: '_Web Component/Results list',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const AngularGnResultsListListStory = () => ({
  component: GnResultsListComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'LIST',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListListStory.storyName = 'List'

export const AngularGnResultsListBlockStory = () => ({
  component: GnResultsListComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'BLOCK',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListBlockStory.storyName = 'Block'

export const AngularGnResultsListTextStory = () => ({
  component: GnResultsListComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'TEXT',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListTextStory.storyName = 'Text'

export const AngularGnResultsListTitleStory = () => ({
  component: GnResultsListComponent,
  props: {
    apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
    layout: 'TITLE',
    primaryColor: color('Primary Color', 'blue'),
    secondaryColor: color('Secondary Color', 'grey'),
  },
})
AngularGnResultsListTitleStory.storyName = 'Title'
