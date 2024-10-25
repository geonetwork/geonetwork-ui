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
import { PaginationComponent } from './pagination.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { FormsModule } from '@angular/forms'

export default {
  title: 'Elements/PaginationComponent',
  component: PaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonComponent,
        UtilI18nModule,
        FormsModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 700px">${story}</div>`
    ),
  ],
} as Meta<PaginationComponent>

export const Primary: StoryObj<PaginationComponent> = {
  args: {
    currentPage: 1,
    nPages: 10,
  },
}
