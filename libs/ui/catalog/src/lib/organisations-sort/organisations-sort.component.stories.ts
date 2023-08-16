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
import { OrganisationsSortComponent } from './organisations-sort.component'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'

export default {
  title: 'Catalog/OrganisationsSortComponent',
  component: OrganisationsSortComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownSelectorComponent],
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 1000px">${story}</div>`
    ),
  ],
} as Meta<OrganisationsSortComponent>

export const Primary: StoryObj<OrganisationsSortComponent> = {}
