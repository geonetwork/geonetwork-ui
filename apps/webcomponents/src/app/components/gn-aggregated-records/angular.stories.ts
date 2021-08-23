import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { GnAggregatedRecordsComponent } from './gn-aggregated-records.component'
import { WebcomponentsModule } from '../../webcomponents.module'

export default {
  title: 'Angular Components/GnAggregatedRecordsComponent',
  component: GnAggregatedRecordsComponent,
  decorators: [
    moduleMetadata({
      imports: [WebcomponentsModule],
    }),
  ],
  argTypes: {
    apiUrl: {
      control: 'text',
    },
    primaryColor: { control: 'color' },
    secondaryColor: { control: 'color' },
    mainColor: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
} as Meta<GnAggregatedRecordsComponent>

const Template: Story<GnAggregatedRecordsComponent> = (
  args: GnAggregatedRecordsComponent
) => ({
  component: GnAggregatedRecordsComponent,
  props: args,
})

export const ByKeywords = Template.bind({})
ByKeywords.args = {
  aggregationField: 'tag.default',
  aggregationMaxCount: 20,
  aggregationQueryString: '+isTemplate:n',
  apiUrl: 'https://apps.titellus.net/geonetwork/srv/api',
  primaryColor: '#e73f51',
  secondaryColor: '#c2e9dc',
  mainColor: '#212029',
  backgroundColor: '#fdfbff',
}
