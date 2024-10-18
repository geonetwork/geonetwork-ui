import { TranslateModule } from '@ngx-translate/core'
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { PaginationButtonsComponent } from './pagination-buttons.component'
import { FormsModule } from '@angular/forms'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Elements/PaginationButtonsComponent',
  component: PaginationButtonsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonComponent,
        UtilI18nModule,
        FormsModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
  render: (args: PaginationButtonsComponent) => ({
    props: {
      ...args,
      newCurrentPageEvent: action('newCurrentPageEvent'),
    },
  }),
} as Meta<PaginationButtonsComponent>

export const Primary: StoryObj<PaginationButtonsComponent> = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  parameters: {
    layout: 'centered',
  },
}
