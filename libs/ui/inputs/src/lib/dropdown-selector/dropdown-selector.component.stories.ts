import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { DropdownSelectorComponent } from './dropdown-selector.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/DropdownSelectorComponent',
  component: DropdownSelectorComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    applicationConfig({
      providers: [],
    }),
  ],
} as Meta<DropdownSelectorComponent>

export const Primary: StoryObj<DropdownSelectorComponent> = {
  args: {
    title: 'my title',
    ariaName: 'select-dropdown',
    choices: [
      {
        label: 'My Choice 1',
        value: 'choice1',
      },
      {
        label: 'My Choice 2',
        value: 'choice2',
      },
      {
        label: 'My Choice 3',
        value: 'choice3',
      },
    ],
    selected: 'choice1',
    showTitle: true,
  },
  argTypes: {
    selectValue: {
      action: 'selectValue',
    },
  },
}
