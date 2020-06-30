import { moduleMetadata, storiesOf } from '@storybook/angular'
import { color, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { SearchSnapshotWcComponent } from '../search-wc/src/app/search-snapshot-wc/search-snapshot-wc.component'
import { UiModule } from '../../libs/ui/src'

const moduleMetadatas = {
  declarations: [SearchSnapshotWcComponent],
  imports: [UiModule],
}

storiesOf('Angular components', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('Search Snapshot', () => ({
    component: SearchSnapshotWcComponent,
    props: {
      primaryColor: color('Primary Color', 'blue'),
      secondaryColor: color('Secondary Color', 'grey'),
    },
  }))
