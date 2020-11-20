import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { RecordThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
import { RecordPreviewCardComponent } from './record-preview-card.component'

const moduleMetadatas = {
  declarations: [RecordThumbnailComponent],
}

export default {
  title: 'UI/Record preview',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

export const RecordPreviewCardComponentStory = () => ({
  component: RecordPreviewCardComponent,
  props: {
    record: {
      uuid: 'uiiudiiddeaafdjsqmlkfdq',
      title: 'A very nice record',
      thumbnailUrl:
        'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
      abstract:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus euismod libero, eu ullamcorper nisl placerat sit amet. Nulla vel sapien odio. Integer convallis scelerisque lorem, eget ultricies elit ultrices sit amet. Mauris nunc felis, vulputate laoreet lacinia et, volutpat et ligula. Sed a magna et augue convallis pretium. Fusce euismod dui in sapien tincidunt aliquet. Curabitur porttitor mauris a bibendum eleifend.',
      metadataUrl:
        'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    },
  },
})
RecordPreviewCardComponentStory.storyName = 'Card record'
