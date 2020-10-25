import { withA11y } from '@storybook/addon-a11y'
import { boolean, date, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, Story } from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'

export default {
  title: 'UI/Record preview',
  decorators: [withKnobs, withA11y],
} as Meta

function dateObj(name, defaultValue) {
  const stringTimestamp = date(name, defaultValue)
  return new Date(stringTimestamp)
}

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
      url: text('Record URL', 'www.goto.com'),
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
