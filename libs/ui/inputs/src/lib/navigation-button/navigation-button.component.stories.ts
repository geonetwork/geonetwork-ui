import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { NavigationButtonComponent } from './navigation-button.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
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
        MatIconModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<NavigationButtonComponent>

type ButtonComponentWithContent = NavigationButtonComponent & {
  content: string
}

const Template: Story<ButtonComponentWithContent> = (args) => ({
  component: NavigationButtonComponent,
  props: args,
  template:
    '<gn-ui-navigation-button [label]=label [icon]=icon></gn-ui-navigation-button>',
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Retours aux résultats',
  icon: 'navigate_before',
}
