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
    category: 'My Category',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices turpis nec eleifend ornare. Etiam ante est, pulvinar ac diam nec, sollicitudin tristique leo. Vivamus a dui sed ex mattis tempus non in urna. Phasellus vel ante a risus rhoncus finibus ac sed nisl. Sed sapien lorem, gravida sit amet congue maximus, lobortis a sapien.',
    url: 'www.goto.com',
    more: 'Read more',
    open: 'Open record',
  },
}

RecordPreviewListComponentStory.storyName = 'Simple record'
