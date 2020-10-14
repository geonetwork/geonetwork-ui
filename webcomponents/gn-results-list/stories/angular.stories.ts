import { withA11y } from '@storybook/addon-a11y'
import { color, text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { I18nModule } from '../../../libs/common/src'
import { GnResultsListComponent } from '../src/app/gn-results-list.component'

const moduleMetadatas = {
  imports: [I18nModule],
}

storiesOf('Angular components', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('Search Snapshot', () => ({
    component: GnResultsListComponent,
    props: {
      apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
      primaryColor: color('Primary Color', 'blue'),
      secondaryColor: color('Secondary Color', 'grey'),
    },
  }))
