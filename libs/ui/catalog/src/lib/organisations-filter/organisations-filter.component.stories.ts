import { TranslateModule } from '@ngx-translate/core'
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { OrganisationsFilterComponent } from './organisations-filter.component'

export default {
  title: 'Catalog/OrganisationsFilterComponent',
  component: OrganisationsFilterComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 1000px">${story}</div>`
    ),
  ],
} as Meta<OrganisationsFilterComponent>

export const Primary: StoryObj<OrganisationsFilterComponent> = {}
