import { AutocompleteComponent } from '../src/lib/autocomplete/autocomplete.component'
import { of } from 'rxjs'
import { DropdownSelectorComponent } from '../src'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { BrowserModule } from '@angular/platform-browser'
import { RecordSummaryComponent } from '../src/lib/record-summary/record-summary.component'
import { withKnobs, text, object, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withA11y } from '@storybook/addon-a11y'
import { ButtonComponent } from '../src/lib/button/button.component'

const moduleMetadatas = {
  declarations: [
    DropdownSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule],
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
