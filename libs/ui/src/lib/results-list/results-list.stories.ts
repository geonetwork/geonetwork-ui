import {
  RecordSummary,
  ResultsListLayout,
  TRANSLATE_DEFAULT_CONFIG,
} from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { object, select, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { UiModule } from '../ui.module'
import { ResultsListComponent } from './results-list.component'

const moduleMetadatas = {
  declaration: [],
  imports: [TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG), UiModule],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

const records: RecordSummary[] = [
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 1',
    abstract: 'this is the abstract of metadata 1',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
  },
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 2',
    abstract:
      'this is the abstract of metadata 2. This abstract will contain some extra dummy text just to see how it displays on more than one line',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
  },
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 3',
    abstract: 'this is the abstract of metadata 3',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
  },
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 4',
    abstract: 'this is the abstract of metadata 4',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
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
