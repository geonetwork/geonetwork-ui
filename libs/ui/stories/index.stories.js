import { AutocompleteComponent } from '../src/lib/autocomplete/autocomplete.component'
import { of } from 'rxjs'
import { DropdownSelectorComponent } from '../src'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser'
import { RecordSummaryComponent } from '../src/lib/record-summary/record-summary.component'

const moduleMetadatas = {
  declarations: [DropdownSelectorComponent, AutocompleteComponent],
  imports: [NgbModule, BrowserModule],
}

storiesOf('UI', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .add('DropdownSelectorComponent', () => ({
    component: DropdownSelectorComponent,
    props: {
      title: 'my title',
      ariaName: 'aria name',
      choices: [
        {
          label: 'last changed',
          value: 'lastUpdated',
        },
        {
          label: 'popularity',
          value: 'popularity',
        },
      ],
    },
  }))
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
