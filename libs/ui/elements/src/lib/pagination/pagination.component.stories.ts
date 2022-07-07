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
import { PaginationComponent } from './pagination.component'

export default {
  title: 'Layout/PaginationComponent',
  component: PaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 700px">${story}</div>`
    ),
  ],
} as Meta<PaginationComponent>

const Template: Story<PaginationComponent> = (args: PaginationComponent) => ({
  component: PaginationComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  currentPage: 1,
  nPages: 10,
}
