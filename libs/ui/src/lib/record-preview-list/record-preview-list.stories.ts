import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { Meta, Story } from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'

export default {
  title: 'UI/Record preview',
  component: RecordPreviewListComponent,
  decorators: [withKnobs, withA11y],
} as Meta

const Template: Story<RecordPreviewListComponent> = (args) => ({
  component: RecordPreviewListComponent,
  props: args,
})

export const RecordPreviewListComponentStory = Template.bind({})

RecordPreviewListComponentStory.args = {
  record: {
    uuid: 'uiiudiiddeaafdjsqmlkfdq',
    title: 'A very nice record',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    abstract: 'this is a great abstract',
    url: 'www.goto.com',
  },
}

RecordPreviewListComponentStory.storyName = 'Simple record'
