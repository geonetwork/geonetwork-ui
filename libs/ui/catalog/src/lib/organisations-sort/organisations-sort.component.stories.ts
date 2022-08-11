import { TranslateModule } from '@ngx-translate/core'
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { OrganisationsSortComponent } from './organisations-sort.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

export default {
  title: 'Catalog/OrganisationsSortComponent',
  component: OrganisationsSortComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        UiInputsModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 1000px">${story}</div>`
    ),
  ],
} as Meta<OrganisationsSortComponent>

const Template: Story<OrganisationsSortComponent> = (
  args: OrganisationsSortComponent
) => ({
  component: OrganisationsSortComponent,
  props: args,
})

export const Primary = Template.bind({})
