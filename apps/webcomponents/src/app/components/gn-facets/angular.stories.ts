import { Meta, moduleMetadata } from '@storybook/angular'
import { GnFacetsComponent } from './gn-facets.component.js'
import { WebcomponentsModule } from '../../webcomponents.module.js'

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
