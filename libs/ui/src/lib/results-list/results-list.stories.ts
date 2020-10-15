import { withA11y } from '@storybook/addon-a11y'
import { object, select, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import {
  I18nModule,
  RecordSimple,
  ResultsListLayout,
} from '../../../../common/src'
import { UiModule } from '../ui.module'
import { ResultsListComponent } from './results-list.component'

const moduleMetadatas = {
  declaration: [],
  imports: [I18nModule, UiModule],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

const records: RecordSimple[] = [
  {
    title: 'metadata 1',
    abstract: 'this is the abstract of metadata 1',
    url: '',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
  },
  {
    title: 'metadata 2',
    abstract:
      'this is the abstract of metadata 2. This abstract will contain some extra dummy text just to see how it displays on more than one line',
    url: '',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
  },
  {
    title: 'metadata 3',
    abstract: 'this is the abstract of metadata 3',
    url: '',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
  },
  {
    title: 'metadata 4',
    abstract: 'this is the abstract of metadata 4',
    url: '',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
  },
]

const layouts = Object.values(ResultsListLayout)
export const ResultsListStory = () => ({
  component: ResultsListComponent,
  props: {
    layout: select('layout', layouts, layouts[0]),
    records: object('records', records),
  },
})
ResultsListStory.storyName = 'Results list'
