import { AutocompleteComponent } from '../src/lib/autocomplete/autocomplete.component'
import { of } from 'rxjs'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { RecordSummaryComponent } from '../src/lib/record-summary/record-summary.component'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { ButtonComponent } from '../src/lib/button/button.component'
import { UiModule } from '../src'

const moduleMetadatas = {
  imports: [UiModule],
}

storiesOf('UI', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('AutocompleteComponent', () => ({
    component: AutocompleteComponent,
    props: {
      placeholder: 'Full text search',
      action: (term) => of(['Hello', 'World']),
    },
  }))
  .add('RecordSummaryComponent', () => ({
    component: RecordSummaryComponent,
    props: {
      record: {
        uuid: 'uiiudiiddeaafdjsqmlkfdq',
        title: 'A very nice record',
        thumbnailUrl:
          'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
        abstract: 'this is a great abstract',
        url: 'www.goto.com',
      },
    },
    parameters: {},
  }))
  .add('ButtonComponent', () => ({
    template: '<ui-button [type]="type">{{content}}</ui-button>',
    props: {
      type: select('buttonType', ['primary', 'secondary', 'default']),
      content: text('buttonContent', 'My Button'),
    },
  }))
