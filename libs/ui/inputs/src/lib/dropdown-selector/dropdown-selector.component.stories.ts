import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { DropdownSelectorComponent } from './dropdown-selector.component'

export default {
  title: 'Inputs/DropdownSelectorComponent',
  component: DropdownSelectorComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[250px] w-[600px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
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
        label: 'My Choice 2, second choice',
        value: 'choice2',
      },
      {
        label: 'My Choice 3, very very very very very very long text',
        value: 'choice3',
      },
    ],
    selected: 'choice1',
    showTitle: true,
    disabled: false,
  },
  argTypes: {
    selectValue: {
      action: 'selectValue',
    },
  },
}
