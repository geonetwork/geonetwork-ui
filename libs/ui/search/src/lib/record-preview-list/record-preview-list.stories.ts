import { withA11y } from '@storybook/addon-a11y'
import { boolean, date, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { RecordThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
import { RecordPreviewListComponent } from './record-preview-list.component'

const moduleMetadatas = {
  declarations: [RecordThumbnailComponent],
}

export default {
  title: 'UI/Record preview',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const RecordPreviewListComponentStory: Story<RecordPreviewListComponent> = () => ({
  component: RecordPreviewListComponent,
  props: {
    record: {
      uuid: 'uiiudiiddeaafdjsqmlkfdq',
      title: text('Title', 'A very nice record'),
      thumbnailUrl: text(
        'Thumbnail URL',
        'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png'
      ),
      abstract: text(
        'Abstract',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus euismod libero, eu ullamcorper nisl placerat sit amet. Nulla vel sapien odio. Integer convallis scelerisque lorem, eget ultricies elit ultrices sit amet. Mauris nunc felis, vulputate laoreet lacinia et, volutpat et ligula. Sed a magna et augue convallis pretium. Fusce euismod dui in sapien tincidunt aliquet. Curabitur porttitor mauris a bibendum eleifend.'
      ),
      metadataUrl: text(
        'Record URL',
        'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8'
      ),
      updateFrequency: text('Update frequency', 'Updated every month'),
      logoUrl: text(
        'Logo URL',
        'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png'
      ),
      viewable: boolean('Viewable', true),
      downloadable: boolean('Downloadable', true),
    },
  },
})

RecordPreviewListComponentStory.storyName = 'List record'
