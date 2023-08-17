import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ButtonComponent } from './button.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<ButtonComponent>

type ButtonComponentWithContent = ButtonComponent & { content: string }

export const Primary: StoryObj<ButtonComponentWithContent> = {
  args: {
    type: 'default',
    disabled: false,
    extraClass: '',
    content: 'My button',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['primary', 'secondary', 'default', 'outline', 'light'],
    },
  },
  render: (args) => ({
    props: args,
    template:
      '<gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">{{ content }}</gn-ui-button>',
  }),
}
