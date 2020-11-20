import { withA11y } from '@storybook/addon-a11y'
import { text, withKnobs } from '@storybook/addon-knobs'
import { RecordThumbnailComponent } from './record-thumbnail.component'

export default {
  title: 'UI/Record preview',
  decorators: [withKnobs, withA11y],
}

export const RecordThumbnailComponentStory = () => ({
  component: RecordThumbnailComponent,
  props: {
    thumbnailUrl: text(
      'url',
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png'
    ),
  },
})
RecordThumbnailComponentStory.storyName = 'Record thumbnail'
