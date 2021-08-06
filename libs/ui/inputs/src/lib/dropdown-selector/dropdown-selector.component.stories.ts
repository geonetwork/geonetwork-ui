import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { DropdownSelectorComponent } from './dropdown-selector.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'DropdownSelectorComponent',
  component: DropdownSelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<DropdownSelectorComponent>

const Template: Story<DropdownSelectorComponent> = (
  args: DropdownSelectorComponent
) => ({
  component: DropdownSelectorComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
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
}
Primary.argTypes = {
  selectValue: {
    action: 'selectValue',
  },
}
