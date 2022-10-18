import { moduleMetadata, Story, Meta } from '@storybook/angular'
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

const Template: Story<ButtonComponentWithContent> = (args) => ({
  component: ButtonComponent,
  props: args,
  template:
    '<gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">{{content}}</gn-ui-button>',
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'default',
  disabled: false,
  extraClass: '',
  content: 'My button',
}
Primary.argTypes = {
  type: {
    control: 'radio',
    options: ['primary', 'secondary', 'default', 'outline'],
  },
}
