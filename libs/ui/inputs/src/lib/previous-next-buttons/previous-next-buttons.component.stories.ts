import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { PreviousNextButtonsComponent } from './previous-next-buttons.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/PreviousNextButtonsComponent',
  component: PreviousNextButtonsComponent,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<PreviousNextButtonsComponent>

export const Primary: StoryObj<PreviousNextButtonsComponent> = {
  args: {
    isFirst: true,
    isLast: false,
  },
  render: (args) => ({
    props: args,
    template:
      '<gn-ui-previous-next-buttons [isFirst]="true" [isLast]="false"></gn-ui-previous-next-buttons>',
  }),
}
