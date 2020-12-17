import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { color, text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { I18nModule, TRANSLATE_DEFAULT_CONFIG } from '../../../libs/common/src'
import { GnSearchInputComponent } from '../src/app/gn-search-input.component'
import { GnSearchInputModule } from '../src/app/gn-search-input.module'

const moduleMetadatas = {
  imports: [
    I18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    GnSearchInputModule,
  ],
}

storiesOf('_Web Component', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('Search Snapshot', () => ({
    component: GnSearchInputComponent,
    props: {
      apiUrl: text('api url', 'https://apps.titellus.net/geonetwork/srv/api'),
      primaryColor: color('Primary Color', 'blue'),
      secondaryColor: color('Secondary Color', 'grey'),
    },
  }))
