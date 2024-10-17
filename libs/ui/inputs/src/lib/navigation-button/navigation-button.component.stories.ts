import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { NavigationButtonComponent } from './navigation-button.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/NavigationButtonComponent',
  component: NavigationButtonComponent,
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
} as Meta<NavigationButtonComponent>

type ButtonComponentWithContent = NavigationButtonComponent & {
  content: string
}

export const Primary: StoryObj<ButtonComponentWithContent> = {
  args: {
    label: 'Retours aux résultats',
    icon: 'navigate_before',
  },
  render: (args) => ({
    props: args,
    template:
      '<gn-ui-navigation-button [label]=label [icon]=icon></gn-ui-navigation-button>',
  }),
}
