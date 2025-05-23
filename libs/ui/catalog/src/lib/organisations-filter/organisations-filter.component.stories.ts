import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { OrganisationsFilterComponent } from './organisations-filter.component'

export default {
  title: 'Catalog/OrganisationsFilterComponent',
  component: OrganisationsFilterComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 1000px">${story}</div>`
    ),
  ],
} as Meta<OrganisationsFilterComponent>

export const Primary: StoryObj<OrganisationsFilterComponent> = {}
