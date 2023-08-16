import { Meta, moduleMetadata } from '@storybook/angular'
import { DEFAULT_RESULTS_LAYOUT_CONFIG } from '@geonetwork-ui/ui/search'
import { GnResultsListComponent } from './gn-results-list.component'
import { WebcomponentsModule } from '../../webcomponents.module'

export default {
  title: 'Angular Components/GnResultsListComponent',
  component: GnResultsListComponent,
  decorators: [
    moduleMetadata({
      imports: [WebcomponentsModule],
    }),
  ],
  argTypes: {
    apiUrl: {
      control: 'text',
    },
    layout: {
      control: 'radio',
      options: Object.keys(DEFAULT_RESULTS_LAYOUT_CONFIG),
    },
    primaryColor: { control: 'color' },
    secondaryColor: { control: 'color' },
    mainColor: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
} as Meta<GnResultsListComponent>

/*
type Story = StoryObj<GnResultsListComponent>

const defaultArgs = {
  apiUrl: 'https://apps.titellus.net/geonetwork/srv/api',
  primaryColor: '#e73f51',
  secondaryColor: '#c2e9dc',
  mainColor: '#212029',
  backgroundColor: '#fdfbff',
  size: '10',
  query: '',
  filter: '',
  showMore: 'none' as ResultsListShowMoreStrategy,
}

export const AsList: Story = {
  args: {
    ...defaultArgs,
    layout: 'LIST',
  },
}
export const AsCard: Story = {
  args: {
    ...defaultArgs,
    layout: 'CARD',
  },
}

export const AsText: Story = {
  args: {
    ...defaultArgs,
    layout: 'TEXT',
  },
}

export const AsTitle: Story = {
  args: {
    ...defaultArgs,
    layout: 'TITLE',
  },
}
*/
