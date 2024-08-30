import { Meta, moduleMetadata } from '@storybook/angular'
import { GnFacetsComponent } from './gn-facets.component'
import { WebcomponentsModule } from '../../webcomponents.module'

export default {
  title: 'Angular Components/GnFacets',
  component: GnFacetsComponent,
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
} as Meta<GnFacetsComponent>
