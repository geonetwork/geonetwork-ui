import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { Meta, Story } from '@storybook/angular'
import { RecordThumbnailComponent } from './record-thumbnail.component'

export default {
  title: 'UI/Record preview',
  component: RecordThumbnailComponent,
  decorators: [withKnobs, withA11y],
} as Meta

const Template: Story<RecordThumbnailComponent> = (args) => ({
  component: RecordThumbnailComponent,
  props: args,
})

export const RecordThumbnailComponentStory = Template.bind({})

RecordThumbnailComponentStory.args = {
  thumbnailUrl:
    'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
}

RecordThumbnailComponentStory.storyName = 'Record thumbnail'
